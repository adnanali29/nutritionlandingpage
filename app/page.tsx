"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Infinite Carousel hook ─── */
function useInfiniteCarousel(originalLength: number, autoplayMs = 3500) {
  const [index, setIndex] = useState(originalLength);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => {
    setIsTransitioning(true);
    setIndex((i) => i + 1);
  }, []);

  const prev = useCallback(() => {
    setIsTransitioning(true);
    setIndex((i) => i - 1);
  }, []);

  const select = useCallback((target: number) => {
    setIsTransitioning(true);
    setIndex(target + originalLength);
  }, [originalLength]);

  // Sync index if originalLength changes (dynamic load)
  useEffect(() => {
    setIndex(originalLength);
  }, [originalLength]);

  useEffect(() => {
    if (originalLength === 0) return;
    if (index >= originalLength * 2) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(index - originalLength);
      }, 560);
      return () => clearTimeout(t);
    } else if (index < originalLength) {
      const t = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(index + originalLength);
      }, 560);
      return () => clearTimeout(t);
    }
  }, [index, originalLength]);

  useEffect(() => {
    if (!isTransitioning) {
      const t = setTimeout(() => {
        setIsTransitioning(true);
      }, 20);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  useEffect(() => {
    timer.current = setTimeout(next, autoplayMs);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [index, next, autoplayMs]);

  return { index, next, prev, select, isTransitioning };
}

/* ─── SVG icons ─── */
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="3" />
    <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
  </svg>
);

const IconPhoto = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);



const CONCERNS = [
  "None",
  "Weight Loss",
  "Weight Gain",
  "Thyroid (Hypo/Hyper)",
  "PCOS/PCOD",
  "Diabetes/Pre-Diabetes",
  "Gestation (Pregnancy)",
  "Senior Nutrition",
  "Blood Pressure",
  "Renal Function(Kidney)",
  "Child Nutrition",
  "Post-Pregnancy Recovery",
  "Low Iron/Anemia",
  "High Cholesterol",
  "Fatty Liver",
  "IBS/Digestive Issues",
  "Hormonal Imbalance",
  "Joint/Bone Health",
  "Other (Please specify)",
];


/* ─── Transformation slides ─── */
const TRANSFORMATION_SLIDES = [
  { label: "Before / After — Member 1" },
  { label: "Before / After — Member 2" },
  { label: "Before / After — Member 3" },
  { label: "Before / After — Member 4" },
  { label: "Before / After — Member 5" },
];

/* ─── Food slides ─── */
const FOOD_SLIDES = [
  { label: "Dal Tadka", tag: "High Protein" },
  { label: "Roti Sabzi", tag: "Balanced" },
  { label: "Brown Rice Bowl", tag: "Low GI" },
  { label: "Sprout Salad", tag: "Detox" },
  { label: "Khichdi", tag: "Gut Friendly" },
  { label: "Egg Bhurji", tag: "Muscle Gain" },
];

/* ─── Testimonials data ─── */
const TESTIMONIALS = [
  {
    name: "Ankita S",
    program: "Depression and Anxiety",
    result: "Recovered from Depression",
    quote: "I was struggling with depression and anxiety for a long time, and it started affecting every part of my life. With the right guidance, personalized nutrition, and regular support from the team, I slowly regained my confidence and peace of mind. Today, I feel happier, calmer, and more in control of my life. I'm truly grateful for this journey",
    imageUrl: "https://i.ibb.co/spzhZSBw/Ankita.jpg"
  },
  {
    name: "Suparna J",
    program: "PCOS and Weight Loss",
    result: "Lost 8 Kg and Recovered PCOS",
    quote: "I was diagnosed with PCOS and struggled with irregular periods, weight gain, and low confidence. With a personalized nutrition plan, regular guidance, and consistent lifestyle changes, I started seeing positive results within a few months. Today, my health has improved significantly, and I feel more energetic and confident than ever. Thank you for helping me get back on track",
    imageUrl: "https://i.ibb.co/LDqpKRwm/Suparna.png"
  },
  {
    name: "Dr Swastik",
    program: "Strength and Conditioning",
    result: "Improved Endurance and Stamina",
    quote: "I wanted to improve my strength, endurance, and overall fitness. The personalized strength and conditioning program helped me become stronger, more athletic, and far more confident in my performance. I now feel fitter, recover faster, and enjoy every workout. The guidance and support throughout the journey made all the difference",
    imageUrl: "https://i.ibb.co/23rLvxG1/Dr-swastik.jpg"
  },
  {
    name: "Neha P",
    program: "Weight loss",
    result: "Lost 14 kg",
    quote: "After years of struggling with my weight, I finally found a program that was practical and sustainable. The personalized nutrition plan, guided workouts, and constant motivation helped me lose 14 kg while feeling healthier and more confident. I have more energy, better self-esteem, and a lifestyle I can actually maintain. I'm so grateful for this transformation!",
    imageUrl: "https://i.ibb.co/Q7r6qg0b/Neha.jpg"
  },
  {
    name: "Masooma M",
    program: "PCOS and Weight Loss",
    result: "Recovered PCOS & Lost 30 Kg",
    quote: "For years, I believed my PCOS was the reason I could never lose weight. This program completely changed my perspective. Instead of crash diets, I learned how to eat right, train smart, and stay consistent. I've lost 16 kg, my cycles have become more regular, and I finally feel confident in my own skin",
    imageUrl: "https://i.ibb.co/GvR5jQK7/Massoma-2.png"
  },
  {
    name: "Rajan",
    program: "Strength and Conditioning",
    result: "Gained 5 kg and Strength",
    quote: "had always struggled to gain healthy weight and build muscle despite working out regularly. The customized nutrition plan and strength training program helped me gain 5 kg of lean body weight while becoming noticeably stronger and more energetic. I finally feel confident in my physique, and my performance in the gym has improved tremendously",
    imageUrl: "https://i.ibb.co/7dggHNYD/Rajan.jpg"
  },
  {
    name: "Amit Patel, 42",
    program: "Diabetes Management",
    result: "✓ Reversed Type 2 Diabetes & stopped meds",
    quote: "My HbA1c had touched 8.5 and doctors said I'd need insulin soon. Since joining, the custom meal plans and mild exercise sessions worked like a charm. My sugar level is completely normal now and doctor has stopped my morning tablet. Pure magic!",
    imageUrl: ""
  },
  {
    name: "Sunita Rao, 38",
    program: "Thyroid Management",
    result: "↓ Lost 9kg & balanced TSH levels",
    quote: "Dealing with hypothyroid made me feel tired all day and losing weight was impossible. The clinical team understood this and gave a customized diet rich in iodine and selenium. My energy is back, skin is glowing, and TSH is back in normal range.",
    imageUrl: ""
  },
  {
    name: "Rahul Verma, 31",
    program: "Weight Loss Program",
    result: "↓ Shed 18kg in 6 months",
    quote: "I tried going to the gym and doing keto on my own, but always failed. The structured weekly guidance here and simple home-cooked Indian meals made the weight loss sustainable. Best part? No fancy ingredients, just normal ghar ka khana.",
    imageUrl: ""
  },
  {
    name: "Meera Nair, 29",
    program: "Post-Pregnancy Care",
    result: "✓ Lost 11kg & rebuilt core strength",
    quote: "Post my delivery, I was struggling with postpartum weight and severe back pain. The gentle postnatal yoga and nutrition schedule was perfect. It never affected my lactation and I gained my pre-pregnancy fitness back safely.",
    imageUrl: ""
  },
  {
    name: "Rajesh Kumar, 45",
    program: "Gut Health Reset",
    result: "✓ Cured chronic acidity & bloating",
    quote: "For years, my day started with an antacid capsule. This program taught me how to eat to fix my gut microbiome. Within a month, my acidity vanished. I can now sleep peacefully without any burning sensation or gas.",
    imageUrl: ""
  },
  {
    name: "Kavya Iyer, 26",
    program: "PCOS Care Plan",
    result: "✓ Regular cycles & cleared acne",
    quote: "PCOS had messed up my period cycles completely, and my weight was just going up. The target workouts and seed-cycling diet plan they suggested worked wonders. My periods are regular now without any hormonal pills!",
    imageUrl: ""
  },
  {
    name: "Sandeep Joshi, 52",
    program: "Senior Nutrition Program",
    result: "↓ Dropped 10kg & reduced uric acid",
    quote: "At my age, joint stiffness and high uric acid made workouts very difficult. The team designed a low-purine diet and low-impact mobility exercises. Today I can walk 5 kilometers easily without any heel pain.",
    imageUrl: ""
  },
  {
    name: "Tanvi Shah, 33",
    program: "Clinical Nutrition",
    result: "✓ Managed fatty liver & cholesterol",
    quote: "I was diagnosed with Grade 2 Fatty Liver during a routine checkup. The clinical diet plan focused on healthy fats and portion control. In my recent ultrasound, my liver is completely normal, and lipid profile is clean.",
    imageUrl: ""
  },
  {
    name: "Arjun Mehta, 27",
    program: "Personal Fitness Training",
    result: "✓ Gained 6kg lean muscle & stamina",
    quote: "I was very skinny and felt self-conscious. The muscle gain diet combined with structured weight training helped me bulk up cleanly. My strength has doubled and I feel extremely confident now.",
    imageUrl: ""
  },
  {
    name: "Neha Deshmukh, 35",
    program: "PCOS and Weight Loss",
    result: "↓ Lost 13kg & reversed insulin resistance",
    quote: "Losing weight with insulin resistance was a nightmare. This program focused on low glycemic index foods and home workouts. Slowly, my waist size reduced and my fasting insulin levels came down to normal.",
    imageUrl: ""
  },
  {
    name: "Ramesh Sharma, 62",
    program: "Senior Nutrition Program",
    result: "↓ Lost 12kg & reduced joint pain",
    quote: "I was hesitant about an online program at my age, but the soft-diet plan and low-impact workouts helped me lose weight safely, without straining my joints.",
    imageUrl: ""
  },
  {
    name: "Priya Patel, 28",
    program: "HIIT & Weight Management",
    result: "↓ Down 15kg, improved energy",
    quote: "The one-on-one attention made all the difference. Pairing high-energy workouts with precise macro targets made losing weight feel almost effortless.",
    imageUrl: ""
  },
  {
    name: "Ananya Sen, 34",
    program: "Clinical Nutrition Program",
    result: "✓ Managed PCOS & gut health",
    quote: "Severe bloating and PCOS symptoms had taken over my life. A gut-friendly nutrition schedule from the clinical team turned things around within weeks.",
    imageUrl: ""
  }
];

const DISEASE_ICONS = [
  {
    name: "Doctor",
    color: "#e6f4fe",
    textColor: "#0d8ecf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
        <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
        <circle cx="12" cy="7" r="1" />
        <path d="M19 5h4M21 3v4" />
      </svg>
    )
  },
  {
    name: "PCOS",
    color: "#e6f4fe",
    textColor: "#0d8ecf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="6" />
        <path d="M12 15v7M9 19h6" />
        <path d="M12 6a3 3 0 0 1 3 3" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    name: "Weight Machine",
    color: "#e6f4fe",
    textColor: "#0d8ecf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="12" cy="9" r="3" />
        <path d="m11 9 2-2" />
        <path d="M6 16h12" />
      </svg>
    )
  },
  {
    name: "Diabetes",
    color: "#e6f4fe",
    textColor: "#0d8ecf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 8.7 5 15a7 7 0 0 0 7 7z" />
        <path d="M12 12v4M10 14h4" />
      </svg>
    )
  },
  {
    name: "Kidney",
    color: "#e6f4fe",
    textColor: "#0d8ecf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 6c-2 1.5-3 4-3 6.5s1 5 3 6.5c1.5 1 3.5.5 4.5-1l1-1.5c.5-.8.5-1.8 0-2.6L11 11.5c-1-1.5-3-2-4.5-1Z" />
        <path d="M17 6c2 1.5 3 4 3 6.5s-1 5-3 6.5c-1.5 1-3.5.5-4.5-1l-1-1.5c-.5-.8-.5-1.8 0-2.6l1.5-2.4c1-1.5 3-2 4.5-1Z" />
      </svg>
    )
  },
  {
    name: "Liver",
    color: "#e6f4fe",
    textColor: "#0d8ecf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.5 8c-1.5-2-4.5-3.5-8.5-3C7.5 5.5 4 8.5 3 12c-1 3.5 1 7.5 4.5 8.5 3.5 1 8.5.5 11-2.5 2.5-3 3.5-8 2-10Z" />
      </svg>
    )
  },
  {
    name: "Stomach",
    color: "#e6f4fe",
    textColor: "#0d8ecf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3c-2.5 0-5 2-6.5 4.5C7 10 7 13 8.5 15.5c1 1.5 2.5 2.5 4.5 2.5 3.5 0 6.5-3 6.5-6.5S17.5 3 15 3Z" />
        <path d="M9 7.5C6 7.5 4.5 9 4.5 11c0 3 2.5 5 4.5 6.5" />
      </svg>
    )
  },
  {
    name: "Bone",
    color: "#e6f4fe",
    textColor: "#0d8ecf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.5 5.5A2.5 2.5 0 0 0 15 9l-6 6a2.5 2.5 0 0 0-3.5 3.5A2.5 2.5 0 0 0 9 15l6-6a2.5 2.5 0 0 0 3.5-3.5Z" />
        <circle cx="5.5" cy="18.5" r="1.5" fill="currentColor" />
        <circle cx="18.5" cy="5.5" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    name: "Medicine",
    color: "#e6f4fe",
    textColor: "#0d8ecf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    )
  },
  {
    name: "Mental Health",
    color: "#e6f4fe",
    textColor: "#0d8ecf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
      </svg>
    )
  }
];

const HERO_BGS = [
  "https://i.ibb.co/yBGZQfRt/1.webp",
  "https://i.ibb.co/gMwb2q60/2.webp",
  "https://i.ibb.co/9m9KFdRv/3.webp",
  "https://i.ibb.co/hxXydSjh/4.webp",
  "https://i.ibb.co/67r1JP12/5.webp",
  "https://i.ibb.co/wh4ky3rJ/6.webp"
];

interface TransformationSlide {
  id?: string;
  label?: string;
  name?: string;
  disease?: string;
  imageUrl?: string;
}

interface FoodSlide {
  id?: string;
  label: string;
  tag: string;
  imageUrl?: string;
}

interface Testimonial {
  id?: string;
  name: string;
  program: string;
  result: string;
  quote: string;
  imageUrl?: string;
}

const FAQS = [
  {
    category: "PCOS",
    q: "Can PCOS be reversed with diet alone?",
    a: "While PCOS cannot be permanently \"cured,\" its symptoms can be effectively managed and reversed. Our clinical plans target insulin resistance—the root cause of PCOS—using balanced Indian meals (complex carbs, protein, and healthy fats) to restore hormonal balance and regulate periods without extreme restriction."
  },
  {
    category: "PCOS",
    q: "Do I need to stop eating rice and roti to manage PCOS?",
    a: "Absolutely not. Banning carbs can actually worsen hormonal stress. We design your plan using traditional grains like hand-pounded rice, wheat, and millets, paired with precise protein and fiber portions to control insulin spikes while letting you enjoy your daily meals."
  },
  {
    category: "Post Pregnancy",
    q: "How soon can I start my post-pregnancy weight loss plan?",
    a: "You can start a safe, nourishment-focused plan after 6 weeks for a normal delivery, and 8 weeks for a C-section, after consulting your doctor. Our plans prioritize rebuilding pelvic floor strength, restoring bone density, and providing clean nutrition that supports lactation."
  },
  {
    category: "Post Pregnancy",
    q: "Will losing weight affect my breast milk supply?",
    a: "No. Our post-pregnancy plans focus on nutrient density rather than calorie starvation. We ensure you get ample calcium, iron, healthy fats, and galactagogues (lactation boosters) so you lose fat safely while keeping your milk supply rich and steady."
  },
  {
    category: "Diabetes Control",
    q: "Is it possible to reduce diabetes medication through nutrition?",
    a: "Yes, under clinical and medical guidance. Many of our members have successfully reduced or completely stopped their diabetes medication by improving insulin sensitivity. We do this through medical nutrition therapy, structured activity, and continuous glucose monitoring support."
  },
  {
    category: "Diabetes Control",
    q: "Can diabetic patients eat fruits and potatoes on this plan?",
    a: "Yes. Diabetes management is about managing the total glycemic load of the meal, not just banning individual ingredients. We teach you how to smart-pair carbohydrates with fiber, healthy fats, and protein so you can safely enjoy a wide variety of local foods without blood sugar spikes."
  }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [heroBgIndex, setHeroBgIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic states initialized with static fallback contents
  const [heroBgs, setHeroBgs] = useState<string[]>(HERO_BGS);
  const [avatarIcons, setAvatarIcons] = useState<string[]>([
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  ]);
  const [transformationSlides, setTransformationSlides] = useState<TransformationSlide[]>(TRANSFORMATION_SLIDES);
  const [foodSlides, setFoodSlides] = useState<FoodSlide[]>(FOOD_SLIDES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);

  const galleryCarousel = useInfiniteCarousel(transformationSlides.length, 5500);
  const foodCarousel = useInfiniteCarousel(foodSlides.length, 3000);
  const testimonialCarousel = useInfiniteCarousel(testimonials.length, 6000);
  const [urgencyIndex, setUrgencyIndex] = useState(0);

  // Cycle urgency message loop every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyIndex((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const URGENCY_SERVICES = [
    "Weight Loss Program",
    "Diabetes Management",
    "PCOS Care Plan",
    "Thyroid Management",
    "Post-Pregnancy Care",
    "Clinical Nutrition",
    "Personal Fitness Training",
    "Gut Health Reset"
  ];

  const INDIAN_NAMES = [
    "Priya", "Ananya", "Riya", "Sneha", "Aditi", "Pooja", "Meera", "Neha", "Divya", "Kriti",
    "Shreya", "Kavya", "Tanvi", "Ishita", "Nisha", "Amit", "Rahul", "Rohan", "Aditya", "Vikram",
    "Sandeep", "Deepak", "Rajesh", "Sanjay", "Anil", "Arjun", "Karan", "Gaurav", "Vijay", "Abhishek"
  ];

  const getUrgencyMessage = () => {
    const serviceIndex = urgencyIndex % URGENCY_SERVICES.length;
    const service = URGENCY_SERVICES[serviceIndex];
    const isSlotMessage = urgencyIndex % 2 === 0;

    if (isSlotMessage) {
      const twoDayBucket = Math.floor(Date.now() / 172800000);
      const seed = (twoDayBucket * 7 + serviceIndex * 13 + 17) % 8;
      const slotsLeft = seed + 3;
      return (
        <span key={urgencyIndex} className="stack-copy urgency-anim">
          ⚡ Only <b style={{ color: "#E0233B", fontWeight: "800" }}>{slotsLeft} slots left</b> for {service}
        </span>
      );
    } else {
      const nameIndex = urgencyIndex % INDIAN_NAMES.length;
      const name = INDIAN_NAMES[nameIndex];
      return (
        <span key={urgencyIndex} className="stack-copy urgency-anim">
          🎉 <b>{name}</b> enrolled in {service}
        </span>
      );
    }
  };

  // Load content dynamically
  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch("/api/content");
        if (response.ok) {
          const data = await response.json();
          if (data.heroBgs && data.heroBgs.length > 0) setHeroBgs(data.heroBgs);
          if (data.avatarIcons && data.avatarIcons.length > 0) setAvatarIcons(data.avatarIcons);
          if (data.transformations && data.transformations.length > 0) setTransformationSlides(data.transformations);
          if (data.foodPlan && data.foodPlan.length > 0) setFoodSlides(data.foodPlan);
          if (data.successStories && data.successStories.length > 0) setTestimonials(data.successStories);
        }
      } catch (err) {
        console.error("Failed to load content:", err);
      }
    }
    loadContent();
  }, []);

  useEffect(() => {
    if (heroBgs.length === 0) return;
    const interval = setInterval(() => {
      setHeroBgIndex((prev) => (prev + 1) % heroBgs.length);
    }, 4500); // changes image every 4.5 seconds
    return () => clearInterval(interval);
  }, [heroBgs.length]);

  const currentHeroBgIndex = heroBgIndex % (heroBgs.length || 1);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("fname"),
      phone: formData.get("fphone"),
      age: parseInt(formData.get("fage") as string) || 0,
      height: formData.get("fheight"),
      gender: formData.get("fgender"),
      concern: formData.get("fconcern"),
      preferredDate: formData.get("fdate"),
      preferredTime: formData.get("ftime"),
    };

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting consultation:", err);
      alert("Error submitting request. Please try again.");
    }
  }

  return (
    <>
      {/* ================= NAV ================= */}
      <header className="site">
        <div className="nav-float-wrapper">
          <div className="nav">
            <a href="#" className="nav-logo">
              <img src="/addy-logo.png" alt="Addy Fitness" className="nav-logo-img" />
            </a>
            <nav className="nav-links">
              <a href="#services">Services</a>
              <a href="#usp">Why Us</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#gallery">Transformations</a>
              <a href="#testimonials">Results</a>
            </nav>
            <div className="nav-cta">
              <a href="#book" className="btn btn-primary">Book Free Consultation</a>
            </div>

            {/* Hamburger Toggle Button */}
            <button 
              className={`nav-hamburger ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <div className={`mobile-menu-drawer${mobileMenuOpen ? " active" : ""}`}>
        <nav className="mobile-menu-links">
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#usp" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Transformations</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Results</a>
          <div className="mobile-menu-cta">
            <a href="#book" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Book Free Consultation</a>
          </div>
        </nav>
      </div>

      {/* ================= HERO ================= */}
      <section className="hero" id="book">
        {/* Background slideshow carousel */}
        <div className="hero-bg-carousel">
          {heroBgs.map((url, i) => (
            <div
              key={url + i}
              className={`hero-bg-slide${i === currentHeroBgIndex ? " active" : ""}`}
              style={{ backgroundImage: `url('${url}')` }}
            />
          ))}
          <div className="hero-bg-overlay" />
        </div>

        <div className="wrap hero-grid">
          <div className="hero-copy">
            {/* Eyebrow REMOVED as requested */}
            <h1>Your Health.<br /><span className="hero-transformation">Your <em>Transformation.</em></span></h1>
            <p className="sub">
              <strong>From weight loss and diabetes management to PCOS, thyroid, and post-pregnancy care, Addy Fitness combines fitness training, clinical nutrition, and doctor consultations under one roof. Get personalized, doctor-backed health plans built around real Indian food, sustainable fitness, and lasting results.</strong>
            </p>
            <div className="cta-row">
              <a href="#rx-form" className="btn btn-primary">Book Free Consultation →</a>
              <a href="https://wa.me/919861787335" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <svg viewBox="0 0 448 512" width="16" height="16" fill="#25D366" style={{ marginRight: "8px" }}><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                Chat on WhatsApp
              </a>
            </div>

            <div className="urgency-container">
              {getUrgencyMessage()}
            </div>

            <div className="stat-row stat-row-3">
              <div className="stat"><span className="num">2000+</span><span className="lbl">Members Transformed</span></div>
              <div className="stat"><span className="num">6+</span><span className="lbl">Expert Doctors</span></div>
              <div className="stat"><span className="num">4.1★</span><span className="lbl">Average Rating</span></div>
            </div>
          </div>

          {/* ─── Rx Consultation Form Card ─── */}
          <div className="rx-card rx-card-compact" id="rx-form">
            <div className="rx-head">
              <div>
                <span className="rx-title">Get Your Free Plan</span>
                <span className="rx-sub">Rx · Personalized Health Assessment</span>
              </div>
              <div className="rx-cross">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <form className="rx" onSubmit={handleSubmit}>

              {/* Row 1: Full Name + Contact Number */}
              <div className="field-row">
                <div className="field">
                  <label htmlFor="fname">Full Name *</label>
                  <input type="text" id="fname" name="fname" placeholder="e.g. Aditi Sharma" required />
                </div>
                <div className="field">
                  <label htmlFor="fphone">Contact Number *</label>
                  <input type="tel" id="fphone" name="fphone" placeholder="+91 98765 43210" required />
                </div>
              </div>

              {/* Row 2: Age + Height */}
              <div className="field-row">
                <div className="field">
                  <label htmlFor="fage">Age *</label>
                  <input type="number" id="fage" name="fage" placeholder="e.g. 28" min={10} max={90} required />
                </div>
                <div className="field">
                  <label htmlFor="fheight">Height</label>
                  <input type="text" id="fheight" name="fheight" placeholder="e.g. 5&apos;6&quot; or 168 cm" />
                </div>
              </div>

              {/* Row 4: Gender */}
              <div className="field">
                <label htmlFor="fgender">Gender *</label>
                <select id="fgender" name="fgender" required defaultValue="">
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Health Concerns — dropdown */}
              <div className="field">
                <label htmlFor="fconcern">Health Concern *</label>
                <select id="fconcern" name="fconcern" required defaultValue="">
                  <option value="" disabled>Select your main concern</option>
                  {CONCERNS.map((concern) => (
                    <option key={concern} value={concern}>{concern}</option>
                  ))}
                </select>
              </div>

              {/* Date + Time — combined row */}
              <div className="field-row">
                <div className="field">
                  <label htmlFor="fdate">Preferred Date *</label>
                  <input type="date" id="fdate" name="fdate" required
                    min={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="field">
                  <label htmlFor="ftime">Preferred Time *</label>
                  <select id="ftime" name="ftime" required defaultValue="">
                    <option value="" disabled>Select time slot</option>
                    <option value="9am-10am">9:00 AM – 10:00 AM</option>
                    <option value="10am-11am">10:00 AM – 11:00 AM</option>
                    <option value="11am-12pm">11:00 AM – 12:00 PM</option>
                    <option value="12pm-1pm">12:00 PM – 1:00 PM</option>
                    <option value="2pm-3pm">2:00 PM – 3:00 PM</option>
                    <option value="3pm-4pm">3:00 PM – 4:00 PM</option>
                    <option value="4pm-5pm">4:00 PM – 5:00 PM</option>
                    <option value="5pm-6pm">5:00 PM – 6:00 PM</option>
                    <option value="6pm-7pm">6:00 PM – 7:00 PM</option>
                    <option value="7pm-8pm">7:00 PM – 8:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Submit */}
              <div className="rx-submit-wrap">
                <button type="submit" className="btn btn-primary btn-block" disabled={submitted}>
                  {submitted ? "Request Received ✓" : "Book My Free Consultation"}
                </button>
                <p className="rx-note">🔒 100% confidential. No spam. A care coordinator calls within 24 hrs.</p>
              </div>

              {submitted && (
                <div className="form-success visible">
                  ✓ Thank you! Your request is booked — our team will call you shortly.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ================= GALLERY CAROUSEL ================= */}
      <section className="pad gallery-after-hero" id="gallery">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Client Transformations</span>
            <h2>Real people, real results</h2>
            <p>Add your client transformation photos — swipe through real journeys.</p>
          </div>

          {/* Carousel */}
          <div className="carousel-outer">
            <div className="carousel-track-wrap">
              <div className="carousel-track">
                {transformationSlides.length > 0 && [...transformationSlides, ...transformationSlides].map((slide, i) => (
                  <div key={i} className="carousel-slide">
                    <div className="img-slot gallery-slide-slot" style={{ overflow: "hidden", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                      {slide.imageUrl ? (
                        <>
                          <img src={slide.imageUrl} alt={slide.name || slide.label} style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
                          <div style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
                            padding: "16px",
                            color: "white",
                            textAlign: "left",
                            zIndex: 2
                          }}>
                            <h4 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "600", color: "#ffffff" }}>{slide.name || "Client"}</h4>
                            <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", background: "var(--red)", padding: "2px 8px", borderRadius: "100px", display: "inline-block", fontWeight: "600" }}>{slide.disease || "Health Journey"}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="ic"><IconPhoto /></span>
                          <span>{slide.label}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOD CAROUSEL ================= */}
      <section className="pad food-section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Your Plate, Our Plan</span>
            <h2>Food that heals — Indian & delicious</h2>
            <p>Real Indian meals, clinically planned. No quinoa. No guesswork.</p>
          </div>

          <div className="food-carousel-outer">
            <div className="food-carousel-track-wrap">
              <div className="food-carousel-track">
                {foodSlides.length > 0 && [...foodSlides, ...foodSlides].map((food, i) => (
                  <div key={i} className="food-slide">
                    <div className="food-card">
                      <div className="food-img-slot" style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {food.imageUrl ? (
                          <img src={food.imageUrl} alt={food.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <span className="ic"><IconPhoto /></span>
                        )}
                      </div>
                      <div className="food-card-body">
                        <span className="food-tag">{food.tag}</span>
                        <p className="food-name">{food.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="marquee-band">
        <div className="marquee-track">
          <span>2000+ SUCCESS STORIES</span><span>★ 4.1 RATING</span><span>6+ EXPERT DOCTORS</span>
          <span>PCOS-FRIENDLY NUTRITION</span><span>HORMONE-FRIENDLY WORKOUTS</span>
          <span>INSTANT VIDEO CONSULTATIONS</span><span>PAN-INDIA COVERAGE</span><span>CONFIDENTIAL &amp; PERSONALIZED</span>
          <span>2000+ SUCCESS STORIES</span><span>★ 4.1 RATING</span><span>6+ EXPERT DOCTORS</span>
          <span>PCOS-FRIENDLY NUTRITION</span><span>HORMONE-FRIENDLY WORKOUTS</span>
          <span>INSTANT VIDEO CONSULTATIONS</span><span>PAN-INDIA COVERAGE</span><span>CONFIDENTIAL &amp; PERSONALIZED</span>
        </div>
      </div>

      {/* ================= SERVICES ================= */}
      <section className="pad" id="services">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">Programs &amp; Services</span>
            <h2>One platform. Every part of your health.</h2>
            <p>Stop juggling a trainer, a dietitian and a doctor who never talk to each other. Addy Fitness brings all three together, working off the same plan.</p>
          </div>

          <div className="service-grid">
            <div className="service-card">
              <div className="service-icon" style={{ background: "var(--red-tint)" }}>
                {/* Dumbbell / Fitness icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="#E0233B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.5 6.5h1M17.5 6.5h-1M6.5 17.5h1M17.5 17.5h-1" />
                  <rect x="2" y="9.5" width="4" height="5" rx="1.5" />
                  <rect x="18" y="9.5" width="4" height="5" rx="1.5" />
                  <path d="M6 12h12" />
                  <rect x="5.5" y="7.5" width="2" height="9" rx="1" />
                  <rect x="16.5" y="7.5" width="2" height="9" rx="1" />
                </svg>
              </div>
              <h3>Fitness Training</h3>
              <p>Hormone-friendly workout plans built for your body cycle and energy levels — not one-size-fits-all HIIT.</p>
              <span className="tag">Strength · Cardio · Mobility</span>
            </div>
            <div className="service-card">
              <div className="service-icon" style={{ background: "var(--turmeric-tint)" }}>
                {/* Fork & leaf / Nutrition icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="#E9A23B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h1" />
                  <path d="M18 22v-7" />
                </svg>
              </div>
              <h3>Clinical Nutrition</h3>
              <p>Indian meal plans designed by clinical nutritionists — dal, rice and roti stay on your plate, safely.</p>
              <span className="tag">Weight Loss · PCOS · Diabetes</span>
            </div>
            <div className="service-card">
              <div className="service-icon" style={{ background: "var(--sage-tint)" }}>
                {/* Stethoscope icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="#4B6C58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 2h-.5a2 2 0 0 0-2 2v5.5A5.5 5.5 0 0 0 7.5 15v0a5.5 5.5 0 0 0 5.5-5.5V4a2 2 0 0 0-2-2h-.5" />
                  <path d="M7.5 15v3.5a4 4 0 0 0 8 0V17" />
                  <circle cx="19" cy="17" r="2" />
                </svg>
              </div>
              <h3>Doctor Consultation</h3>
              <p>Instant video consults with certified doctors. Every plan is medically reviewed before it reaches you.</p>
              <span className="tag">Video Call · Confidential</span>
            </div>
            <div className="service-card">
              <div className="service-icon" style={{ background: "var(--paper-dim)" }}>
                {/* Trending-up / Chart icon */}
                <svg viewBox="0 0 24 24" fill="none" stroke="#14181A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <h3>Health Management</h3>
              <p>One coach tracking your workouts, meals and reports together — regular check-ins, real accountability.</p>
              <span className="tag">Tracking · Coach Support</span>
            </div>
          </div>

          <div className="chip-strip chip-strip-center">
            {["Weight Loss","Weight Gain","Diabetes","Thyroid","PCOS / PCOD","Pregnancy","Post-Pregnancy","Senior Nutrition","Blood Pressure","Kidney Health","Child Nutrition","Anaemia"].map((c) => (
              <span key={c} className="chip">{c}</span>
            ))}
          </div>

          <div className="cta-row cta-row-center" style={{ marginTop: "40px" }}>
            <a href="#rx-form" className="btn btn-primary">Book Free Consultation</a>
            <a href="https://wa.me/919861787335" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <svg viewBox="0 0 448 512" width="16" height="16" fill="#25D366" style={{ marginRight: "8px" }}><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
              Discuss on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ================= USP ================= */}
      <section className="usp-tagline" id="usp">
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--red-deep)" }}>What Makes Us Different</span>
          <h2 style={{ marginTop: "14px" }}>Your Complete Health Solution</h2>
          <p className="strip">FITNESS · NUTRITION · DOCTOR CONSULTATION — ALL IN ONE PLACE</p>

          <div className="usp-grid">
            {[
              {
                n: "01", title: "Affordable Price", desc: "Expert care, no premium price tag.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12M6 8h12M6 3a5 5 0 0 1 5 5H6m5 0a5 5 0 0 1-5 5h3l6 7"/></svg>
              },
              {
                n: "02", title: "Root Cause First", desc: "We treat the why, not just the symptom.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              },
              {
                n: "03", title: "Indian Food Plans", desc: "Dal, rice & roti stay on your plate.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h1"/><path d="M18 22v-7"/></svg>
              },
              {
                n: "04", title: "One Team, One Plan", desc: "Doctor, nutritionist & trainer — aligned.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              },
              {
                n: "05", title: "Book in just few clicks", desc: "Consult confirmed, call within 24 hrs.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>
              },
            ].map((u) => (
              <div key={u.n} className="usp-card">
                <div className="usp-icon">{u.icon}</div>
                <span className="n">{u.n}</span>
                <h4>{u.title}</h4>
                <p>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY YOU NEED ADDY FITNESS ================= */}
      <section className="pad">
        <div className="wrap why-grid">
          <div>
            <span className="eyebrow" style={{ color: "var(--red-deep)" }}>The Real Problem</span>
            <h2 style={{ marginTop: "14px", fontSize: "clamp(28px,3.4vw,38px)" }}>Why Addy Fitness?</h2>
            <div className="why-list">
              <div className="why-item">
                <div className="x">✕</div>
                <div><strong>Fad diets ban your food.</strong><span className="desc"> Apps cut rice and roti without reading your reports.</span></div>
              </div>
              <div className="why-item">
                <div className="x">✕</div>
                <div><strong>Your experts never talk to each other.</strong><span className="desc"> Three separate bills, three conflicting plans.</span></div>
              </div>
              <div className="why-item">
                <div className="check">✓</div>
                <div><strong>One team. One plan. One price.</strong><span className="desc"> Doctor + nutritionist + trainer — all working together from ₹699.</span></div>
              </div>
              <div className="why-item">
                <div className="check">✓</div>
                <div><strong>Built for Indian bodies.</strong><span className="desc"> Dal, chawal, roti — on your plate, every day.</span></div>
              </div>
            </div>
          </div>

          <div className="why-card">
            <h3>Stop guessing. Start healing.</h3>
            <p>2000+ members replaced generic apps with a doctor-backed plan built around their food, body and budget — starting at ₹699.</p>
            <div className="cta-row">
              <a href="#rx-form" className="btn btn-primary btn-sm">Book Free Consultation</a>
              <a href="https://wa.me/919861787335" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                <svg viewBox="0 0 448 512" width="16" height="16" fill="#25D366" style={{ marginRight: "8px" }}><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="pad band-alt" id="how-it-works">
        <div className="wrap">
          <div className="section-head center" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <span className="eyebrow">What Happens Next</span>
            <h2>From booking to your first result</h2>
            <p>A simple, guided path — no confusion about what comes next.</p>
          </div>

          <div className="steps">
            {[
              {
                n: "01", title: "Book Online", desc: "Fill the form — under 60 seconds.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>,
                color: "var(--red-tint)", stroke: "var(--red)"
              },
              {
                n: "02", title: "We Call You", desc: "Care team calls within 24 hours.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8.1 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.9 2.2z"/></svg>,
                color: "var(--turmeric-tint)", stroke: "var(--turmeric)"
              },
              {
                n: "03", title: "Health Check", desc: "Quick assessment of your goals & history.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 2h-.5a2 2 0 0 0-2 2v5.5A5.5 5.5 0 0 0 7.5 15v0a5.5 5.5 0 0 0 5.5-5.5V4a2 2 0 0 0-2-2h-.5"/><path d="M7.5 15v3.5a4 4 0 0 0 8 0V17"/><circle cx="19" cy="17" r="2"/></svg>,
                color: "var(--sage-tint)", stroke: "var(--sage)"
              },
              {
                n: "04", title: "Lab Test", desc: "Home pickup — Pan-India coverage.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11M3 9h18M3 13v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6"/></svg>,
                color: "#FEF3C7", stroke: "#D97706"
              },
              {
                n: "05", title: "Get Your Plan", desc: "Doctor-approved, Indian-food nutrition plan.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
                color: "#EDE9FE", stroke: "#7C3AED"
              },
              {
                n: "06", title: "Track & Win", desc: "Weekly coach check-ins. Real results.",
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
                color: "var(--red-tint)", stroke: "var(--red)"
              },
            ].map((s) => (
              <div key={s.n} className="step step-v2">
                <span className="step-num">{s.n}</span>
                <div className="step-icon-v2" style={{ background: s.color }}>
                  <span style={{ color: s.stroke }}>{s.icon}</span>
                </div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="cta-row cta-row-center" style={{ marginTop: "48px" }}>
            <a href="#rx-form" className="btn btn-primary">Start My Transformation</a>
            <a href="https://wa.me/919861787335" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <svg viewBox="0 0 448 512" width="16" height="16" fill="#25D366" style={{ marginRight: "8px" }}><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
              Chat with a Coach
            </a>
          </div>
        </div>
      </section>



      {/* ================= TESTIMONIALS ================= */}
      <section className="pad band-alt" id="testimonials">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Success Stories</span>
            <h2>Loved by 2000+ achievers</h2>
            <p>Real members, real reports, real change — under medical guidance.</p>
          </div>
          
          <div className="test-carousel-outer">
            <div className="test-carousel-track-wrap">
              <div className="test-carousel-track">
                {testimonials.length > 0 && [...testimonials, ...testimonials].map((t, i) => (
                  <div key={i} className="test-slide">
                    <div className="test-card">
                      {t.imageUrl && (
                        <div className="img-slot ratio-4-3" style={{ overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <img src={t.imageUrl} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      )}
                      <div className="test-body">
                        <p className="test-quote">{t.quote}</p>
                        <div className="test-person">
                          <div className="who">
                            <b>{t.name}</b>
                            <span>{t.program}</span>
                          </div>
                        </div>
                        <span className="result-pill">{t.result}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="pad band-alt" id="faq">
        <div className="wrap">
          <div className="section-head center" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <span className="eyebrow">Got Questions?</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about our clinical nutrition and training programs.</p>
          </div>

          <div className="faq-grid">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item-card${activeFaq === idx ? " active" : ""}`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="faq-question">
                  <h4>
                    {faq.q}
                  </h4>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section style={{ padding: "20px 0 12px" }}>
        <div className="final-cta" style={{ flexDirection: "column", textAlign: "center", justifyContent: "center", padding: "32px 32px 16px" }}>
          <h2 style={{ fontSize: "clamp(36px, 7vw, 76px)", fontWeight: 900, letterSpacing: "1px", textTransform: "uppercase", color: "#fff", marginBottom: "8px", maxWidth: "100%", lineHeight: 0.95 }}>
            NEVER GIVE UP
          </h2>
          <p style={{ fontSize: "clamp(13px, 1.2vw, 14.5px)", lineHeight: "1.4", fontStyle: "italic", color: "rgba(255, 255, 255, 0.95)", maxWidth: "600px", margin: "0 auto 6px", fontWeight: 500 }}>
            "No matter who you are, where you come from, or what others say about you never give up on yourself. Every setback is preparing you for a stronger comeback. Keep believing, keep fighting, and keep moving forward. Your greatest victory begins the moment you refuse to quit."
          </p>
          <div style={{ fontSize: "11.5px", color: "rgba(255, 255, 255, 0.75)", marginBottom: "8px" }}>
            — <strong style={{ color: "#fff", fontWeight: 700 }}>Adnan Ali</strong>, Founder, Addy Fitness
          </div>
          <div className="cta-row cta-row-center" style={{ marginTop: "4px" }}>
            <a href="#rx-form" className="btn btn-primary btn-sm">
              Start Your Comeback
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="brand"><span className="mark">A+</span>Addy Fitness</div>
              <p>The Complete Health Solution — fitness, nutrition and doctor consultation, all in one place.</p>
              <div className="footer-contact">
                <a href="tel:+919861787335">+91 98617 87335</a>
                <a href="mailto:help@addyfitness.com">help@addyfitness.com</a>
              </div>
              <div className="footer-social">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                </a>
                <a href="https://wa.me/919861787335" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/addy-fitness/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 17v-7"/></svg>
                </a>
              </div>
            </div>
            <div className="fcol">
              <h5>Company</h5>
              <ul>
                <li><a href="#">Sign In</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className="fcol">
              <h5>Services</h5>
              <ul>
                <li><a href="#services">Training</a></li>
                <li><a href="#services">Nutrition</a></li>
                <li><a href="#services">Healthcare</a></li>
                <li><a href="#services">Management</a></li>
              </ul>
            </div>
            <div className="fcol">
              <h5>Legal</h5>
              <ul>
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Refund &amp; Cancellation</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Addy Fitness. All rights reserved.</span>
            <span>Made for your health journey — Cuttack, Odisha to Pan-India.</span>
          </div>
        </div>
      </footer>

      {/* ================= STICKY MOBILE CTA ================= */}
      <div className="sticky-cta">
        <a href="#rx-form" className="btn btn-primary">Book Free Consult</a>
        <a href="https://wa.me/919861787335" target="_blank" rel="noopener noreferrer" className="btn btn-dark">
          <svg viewBox="0 0 448 512" width="16" height="16" fill="#fff" style={{ marginRight: "8px" }}><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
          WhatsApp
        </a>
      </div>

      {/* ================= FLOATING WHATSAPP BUTTON ================= */}
      <a
        href="https://wa.me/919861787335"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 448 512">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
        </svg>
      </a>
    </>
  );
}
