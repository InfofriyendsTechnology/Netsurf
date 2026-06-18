import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';

dotenv.config();

const dummyProducts = [
    // NATURAMORE (Nutrition)
    {
        title: 'Naturamore French Vanilla (For Women)',
        description: 'A premium nutritional supplement designed specifically for women. Enriched with Shatavari, Omega 3 DHA, and essential vitamins to support daily health, hormonal balance, and vitality.',
        category: 'Naturamore',
        price: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder
        resultDescription: 'Significant improvement in energy levels, better skin health, and hormonal balance observed by regular users.',
        isActive: true
    },
    {
        title: 'Naturamore Masala Milk (For Women)',
        description: 'Nutritional supplement tailored for women in a delicious Masala Milk flavor. Contains Ayurvedic herbs and proteins for comprehensive daily nutrition.',
        category: 'Naturamore',
        price: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1550450339-e7a4787a2074?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Helps in combating daily fatigue and maintaining overall wellness.',
        isActive: true
    },
    {
        title: 'Naturamore For Kids (Chocolate Cookie)',
        description: 'A tasty chocolate cookie flavored nutritional drink for growing children. Packed with Brahmi, Shankhpushpi, proteins, and vitamins for brain development and immunity.',
        category: 'Naturamore',
        price: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Parents noticed better concentration, improved memory, and stronger immunity against seasonal flu.',
        isActive: true
    },
    {
        title: 'Naturamore Active',
        description: 'Advanced plant-based nutraceutical for athletes. Features 72% plant protein, BCAAs, and digestive enzymes for optimal muscle recovery and athletic performance.',
        category: 'Naturamore',
        price: 1800,
        imageUrl: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Accelerates post-workout recovery time and supports lean muscle gain.',
        isActive: true
    },
    {
        title: 'Naturamore Joint Care',
        description: 'Formulated with Guggal, Shallaki, and essential minerals to support joint health, reduce inflammation, and improve mobility.',
        category: 'Naturamore',
        price: 900,
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Elderly users reported a 60% reduction in joint stiffness and pain within a month.',
        isActive: true
    },
    {
        title: 'Naturamore Nutriliver',
        description: 'A potent Ayurvedic formulation designed to detoxify the liver, improve digestion, and support overall hepatic functions.',
        category: 'Naturamore',
        price: 850,
        imageUrl: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Improved digestion and enhanced detoxification process.',
        isActive: true
    },

    // BIOFIT (Agriculture)
    {
        title: 'Biofit Stimrich',
        description: 'An advanced plant growth promoter that enhances nutrient uptake, promotes robust root development, and significantly increases crop yield naturally.',
        category: 'Biofit',
        price: 1200,
        imageUrl: 'https://images.unsplash.com/photo-1628183236364-325254924c55?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Farmers noticed up to a 25% increase in crop yield and healthier root systems.',
        isActive: true
    },
    {
        title: 'Biofit Intact',
        description: 'A completely organic, botanical-based pest repellent. Effectively controls sucking pests without leaving harmful chemical residues on crops.',
        category: 'Biofit',
        price: 800,
        imageUrl: 'https://images.unsplash.com/photo-1592424005697-7505ed5bd7da?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Protected crops from severe aphid and whitefly infestations naturally.',
        isActive: true
    },
    {
        title: 'Biofit Bio-99',
        description: 'A highly concentrated, organic sticker, spreader, and activator. Reduces the surface tension of spray solutions for better coverage on leaves.',
        category: 'Biofit',
        price: 650,
        imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Increases the efficacy of other agricultural sprays by 30%.',
        isActive: true
    },

    // HERBS & MORE (Personal Care)
    {
        title: 'Vitamin Therapy Face Wash',
        description: 'A gentle, paraben-free face wash infused with natural herbs and vitamins. Deeply cleanses the skin while maintaining its natural moisture balance.',
        category: 'Herbs & More',
        price: 350,
        imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Clinically proven to reduce acne breakouts and improve skin texture.',
        isActive: true
    },
    {
        title: 'Herbal Dental Paste',
        description: 'A fluoride-free, 100% vegetarian dental paste. Enriched with Neem, Clove, and Aloe Vera to fight cavities, prevent plaque, and ensure fresh breath.',
        category: 'Herbs & More',
        price: 175,
        imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Users experienced a significant reduction in gum bleeding and sensitivity.',
        isActive: true
    },
    {
        title: 'Vitamin Therapy Hair Nutriment',
        description: 'An intensive hair and scalp treatment. Nourishes hair roots, prevents dandruff, and promotes strong, healthy, and shiny hair growth.',
        category: 'Herbs & More',
        price: 450,
        imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Noticeable reduction in hair fall and improved scalp health within 3 weeks.',
        isActive: true
    },

    // CLEAN & MORE (Home Care)
    {
        title: 'Multi Purpose Home Cleaner',
        description: 'A highly concentrated, eco-friendly cleaning solution for all hard surfaces. Tough on stains but entirely gentle on the environment.',
        category: 'Clean & More',
        price: 450,
        imageUrl: 'https://images.unsplash.com/photo-1584820927498-cafe4c21a4f0?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Leaves surfaces 99.9% germ-free without harsh chemical residue.',
        isActive: true
    },
    {
        title: 'Fabric Wash & Conditioner',
        description: 'A 2-in-1 biodegradable liquid detergent. Removes tough stains while keeping fabrics soft and completely safe for sensitive skin.',
        category: 'Clean & More',
        price: 550,
        imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Maintains fabric color brilliance and provides a long-lasting fresh scent.',
        isActive: true
    },

    // RANG DÉ (Cosmetics)
    {
        title: 'Rang Dé Crimson Red Lip Color',
        description: 'A premium, long-lasting lip color enriched with organic butter and natural pigments. Provides a rich matte finish without drying your lips.',
        category: 'Rang Dé',
        price: 650,
        imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Lasts up to 12 hours without smudging while keeping lips perfectly hydrated.',
        isActive: true
    },
    {
        title: 'Rang Dé Concealer Palette',
        description: 'A versatile concealer palette designed for Indian skin tones. Blends seamlessly to cover blemishes, dark circles, and uneven skin tone.',
        category: 'Rang Dé',
        price: 850,
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        resultDescription: 'Provides flawless, lightweight coverage that looks completely natural.',
        isActive: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB connected');

        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        await Product.insertMany(dummyProducts);
        console.log('✅ Added comprehensive Netsurf original products successfully!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
