"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2 } from "lucide-react"
import { completePropertyDeal } from "@backend/actions/analytics"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CompleteDealButtonProps {
    propertyId: string
    propertyTitle: string
    defaultPrice: number
}

export function CompleteDealButton({ propertyId, propertyTitle, defaultPrice }: CompleteDealButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [amount, setAmount] = useState(defaultPrice.toString())
    const [type, setType] = useState("SALE")

    async function handleComplete() {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append("propertyId", propertyId)
            formData.append("amount", amount)
            formData.append("type", type)

            await completePropertyDeal(formData)
            toast.success("Deal completed successfully!")
            setIsOpen(false)
        } catch (error) {
            toast.error("Failed to complete deal")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Complete Deal
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Complete Deal</DialogTitle>
                    <DialogDescription>
                        Mark <b>{propertyTitle}</b> as sold or rented. This will record the transaction for your analytics.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">
                            Deal Type
                        </Label>
                        <div className="col-span-3">
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="SALE">Sale</SelectItem>
                                    <SelectItem value="RENT">Rental</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                            Final Price
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleComplete} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm Deal
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
