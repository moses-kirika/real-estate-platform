const https = require('https');

const imageUrsl = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512918766775-9411917fd82b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1600&auto=format&fit=crop"
];

async function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`OK: ${url}`);
                resolve(true);
            } else {
                console.log(`FAILED (${res.statusCode}): ${url}`);
                resolve(false);
            }
        }).on('error', (e) => {
            console.log(`ERROR: ${url} - ${e.message}`);
            resolve(false);
        });
    });
}

async function run() {
    console.log('Validating image URLs...');
    for (const url of imageUrsl) {
        await checkUrl(url);
    }
}

run();
