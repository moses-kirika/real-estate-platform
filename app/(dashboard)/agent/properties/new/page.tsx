import { PropertyForm } from "@/components/property-form"
import { Separator } from "@/components/ui/separator"

export default function NewPropertyPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Add New Property</h2>
                <p className="text-muted-foreground">
                    List a new property on the marketplace.
                </p>
            </div>
            <Separator />
            <PropertyForm />
        </div>
    )
}
