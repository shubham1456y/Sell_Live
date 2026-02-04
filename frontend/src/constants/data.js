export const MOCK_SELLERS = [
    {
        id: '1',
        name: 'SneakerHeadz',
        shopName: 'SneakerHeadz Store',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&q=80',
        viewers: 1240,
        isLive: true,
        title: 'Rare Jordan Drop! 👟🔥',
        subcategory: 'jordan',
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
        isFollowed: true,
    },
    {
        id: '2',
        name: 'Vintage Vault',
        shopName: 'The Vintage Vault',
        logo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80',
        viewers: 85,
        isLive: true,
        title: '90s Thrift Haul 👕',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
        isFollowed: true,
    },
    {
        id: '3',
        name: 'TechTalks',
        shopName: 'Tech Deals',
        logo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
        viewers: 2300,
        isLive: true,
        title: 'Live Auction: iPhone 15 📱',
        image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80',
        isFollowed: false,
    },
    {
        id: '4',
        name: 'Luxe Bags',
        shopName: 'Luxe Official',
        logo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        viewers: 540,
        isLive: true,
        title: 'Gucci & LV Drop 👜',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
        isFollowed: true,
    },
    {
        id: '5',
        name: 'GamerZone',
        shopName: 'Retro Gamer',
        logo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80',
        viewers: 1200,
        isLive: true,
        title: 'PS5 & Retro Games 🎮',
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80',
        isFollowed: false,
    },
    {
        id: '6',
        name: 'Watch Hunter',
        shopName: 'Timeless Watches',
        logo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80',
        viewers: 320,
        isLive: true,
        title: 'Rolex & Omega Vintage ⌚',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80',
        isFollowed: false,
    },
    {
        id: '7',
        name: 'Kicks 4 Days',
        shopName: 'Kicks 4 Days',
        logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        viewers: 2100,
        isLive: true,
        title: 'Yeezy Slide Restock 🩴',
        image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80',
        isFollowed: true,
    },
    {
        id: '8',
        name: 'Rare Cards',
        shopName: 'PokeCenter Live',
        logo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
        viewers: 890,
        isLive: true,
        title: 'Pokemon Base Box 🃏',
        image: 'https://images.unsplash.com/photo-1613771404721-c5baca102c00?auto=format&fit=crop&w=600&q=80',
        isFollowed: false,
    },
];

export const MOCK_SCHEDULED_STREAMS = [
    {
        id: 's1',
        sellerName: 'SneakerHeadz',
        sellerImage: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&q=80',
        title: 'Nike Dunk Low Panda Restock',
        date: 'Today, 8:00 PM',
        category: 'Sneakers',
        reminderSet: false,
    },
    {
        id: 's2',
        sellerName: 'Luxe Bags',
        sellerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        title: 'Vintage Chanel Collection',
        date: 'Tomorrow, 6:00 PM',
        category: 'Bags',
        reminderSet: true,
    },
    {
        id: 's3',
        sellerName: 'Vintage Vault',
        sellerImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80',
        title: 'Rare 80s Rock Tees',
        date: 'Feb 5, 2:00 PM',
        category: 'Vintage',
        reminderSet: false,
    },
    {
        id: 's4',
        sellerName: 'Kicks 4 Days',
        sellerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        title: 'Sunday Clean Out Sale',
        date: 'Feb 8, 12:00 PM',
        category: 'Sneakers',
        reminderSet: false,
    },
];

export const MOCK_PRODUCT = {
    id: 'p1',
    name: 'Vintage Chicago Bulls Tee',
    price: 45.00,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
};

export const CATEGORIES_DATA = [
    {
        id: 'electronics',
        name: 'Electronics',
        icon: 'Smartphone',
        subcategories: [
            { id: 'all_elec', name: 'All Electronics' },
            { id: 'everyday_elec', name: 'Everyday Electronics' },
            { id: 'tools_gadgets', name: 'Tools & Gadgets' },
            { id: 'laptops', name: 'Laptops & Computers' },
            { id: 'phones', name: 'Mobile Phones & Tablets' },
            { id: 'cameras', name: 'Cameras & Photography' },
            { id: 'acc_elec', name: 'Accessories' },
        ]
    },
    {
        id: 'sneakers',
        name: 'Sneakers & Streetwear',
        icon: 'Footprints',
        subcategories: [
            { id: 'all_sneak', name: 'All Sneakers' },
            { id: 'nike', name: 'Nike' },
            { id: 'jordan', name: 'Jordan' },
            { id: 'adidas', name: 'Adidas' },
            { id: 'yeezy', name: 'Yeezy' },
            { id: 'streetwear', name: 'Streetwear Apparel' },
        ]
    },
    {
        id: 'cards',
        name: 'Trading Cards',
        icon: 'GalleryVerticalEnd',
        subcategories: [
            { id: 'pokemon', name: 'Pokemon' },
            { id: 'sports_cards', name: 'Sports Cards' },
            { id: 'mtg', name: 'Magic: The Gathering' },
            { id: 'yugioh', name: 'Yu-Gi-Oh!' },
        ]
    },
    {
        id: 'mens',
        name: "Men's Fashion",
        icon: 'Shirt',
        subcategories: [
            { id: 'tops', name: 'Tops & Tees' },
            { id: 'bottoms', name: 'Pants & Shorts' },
            { id: 'outerwear', name: 'Jackets & Coats' },
            { id: 'shoes_men', name: 'Shoes' },
        ]
    },
    {
        id: 'womens',
        name: "Women's Fashion",
        icon: 'ShoppingBag',
        subcategories: [
            { id: 'tops_women', name: 'Tops' },
            { id: 'dresses', name: 'Dresses' },
            { id: 'bottoms_women', name: 'Bottoms' },
            { id: 'shoes_women', name: 'Shoes' },
        ]
    },
    {
        id: 'bags',
        name: 'Bags & Accessories',
        icon: 'Briefcase',
        subcategories: [
            { id: 'luxury_bags', name: 'Luxury Bags' },
            { id: 'wallets', name: 'Wallets' },
            { id: 'jewelry_acc', name: 'Jewelry' },
            { id: 'watches', name: 'Watches' },
        ]
    },
    // Add truncated list for simplicity, can expand if user asks specifically for all
    { id: 'beauty', name: 'Beauty', icon: 'Sparkles', subcategories: [] },
    { id: 'sports', name: 'Sports & Outdoor', icon: 'Dumbbell', subcategories: [] },
    { id: 'toys', name: 'Toys & Hobbies', icon: 'Gamepad2', subcategories: [] },
    { id: 'music', name: 'Music', icon: 'Music', subcategories: [] },
    { id: 'vintage', name: 'Vintage', icon: 'Clock', subcategories: [] },
    { id: 'home', name: 'Home & Garden', icon: 'Home', subcategories: [] },
    { id: 'food', name: 'Food & Drinks', icon: 'Coffee', subcategories: [] },
    { id: 'pets', name: 'Pets', icon: 'Dog', subcategories: [] },
];

export const MOCK_PURCHASES = [
    {
        id: 'o1',
        productName: 'Vintage Chicago Bulls Tee',
        shopName: 'Vintage Vault',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=200&q=80',
        price: 45.00,
        status: 'Completed',
        date: 'Jan 28, 2026',
    },
    {
        id: 'o2',
        productName: 'Air Jordan 1 Retro High',
        shopName: 'SneakerHeadz',
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=200&q=80',
        price: 350.00,
        status: 'In Progress',
        date: 'Jan 30, 2026',
    },
    {
        id: 'o3',
        productName: 'Sony PlayStation 5',
        shopName: 'GamerZone',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=200&q=80',
        price: 499.00,
        status: 'Pending',
        date: 'Jan 30, 2026',
    },
    {
        id: 'o4',
        productName: 'Gucci Marmont Bag',
        shopName: 'Luxe Bags',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80',
        price: 950.00,
        status: 'Cancelled',
        date: 'Jan 25, 2026',
    },
    {
        id: 'o5',
        productName: 'Pokemon Base Set Pack',
        shopName: 'Rare Cards',
        image: 'https://images.unsplash.com/photo-1613771404721-c5baca102c00?auto=format&fit=crop&w=200&q=80',
        price: 299.00,
        status: 'Refunded',
        date: 'Jan 20, 2026',
    },
];

export const MOCK_OFFERS = [
    {
        id: 'off1',
        productName: 'Rolex Submariner',
        shopName: 'Watch Hunter',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=200&q=80',
        offerPrice: 8500,
        originalPrice: 9200,
        expiresIn: '2h 15m',
    },
    {
        id: 'off2',
        productName: 'Yeezy Slide Pure',
        shopName: 'Kicks 4 Days',
        image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=200&q=80',
        offerPrice: 180,
        originalPrice: 220,
        expiresIn: '24h',
    },
];

export const MOCK_SELLER_PRODUCTS = [
    {
        id: 'sp1',
        name: 'Vintage Chicago Bulls Tee',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
        description: 'Authentic 90s vintage tee in excellent condition. Size L.',
        rating: 4.8,
        reviews: 124
    },
    {
        id: 'sp2',
        name: 'Retro Denim Jacket',
        price: 85.00,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
        description: 'Classic oversized denim jacket with Sherpa lining.',
        rating: 4.5,
        reviews: 89
    },
    {
        id: 'sp3',
        name: 'Limited Ed. Sneakers',
        price: 120.00,
        image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
        description: 'Never worn, original box included. Size US 10.',
        rating: 5.0,
        reviews: 210
    },
    {
        id: 'sp4',
        name: 'Leather Crossbody Bag',
        price: 65.00,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80',
        description: 'Handcrafted leather bag with brass fittings.',
        rating: 4.7,
        reviews: 156
    }
];
