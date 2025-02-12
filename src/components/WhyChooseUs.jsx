import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🚗",
      title: "Wide Variety of Cars",
      description:
        "Choose from a diverse fleet of vehicles, including economy, SUVs, and luxury cars. Perfect for every journey and budget.",
    },
    {
      icon: "💸",
      title: "Affordable Prices",
      description:
        "Enjoy competitive pricing with no hidden fees. Get the best value for your money without compromising on quality.",
    },
    {
      icon: "🖱️",
      title: "Easy Booking Process",
      description:
        "Our intuitive platform ensures a seamless booking experience. Reserve your car in just a few clicks, anytime, anywhere.",
    },
    {
      icon: "📞",
      title: "Customer Support",
      description:
        "We’ve got you covered 24/7. Reach out to our friendly support team for assistance whenever you need it.",
    },
  ];

  // Ref for section visibility
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

  return (
    <section className="mt-12" id="whyChooseUs" ref={ref}>
      <div className="mx-auto text-center">
        {/* Heading Animation - Slight Rotate + Fade-in */}
        <motion.h2
          className="text-3xl font-bold mb-8 text-gray-800"
          initial={{ opacity: 0, rotateX: 90 }}
          animate={isInView ? { opacity: 1, rotateX: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Why Choose Us?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative bg-gradient-to-b from-orange-500 to-[#df8747] text-black p-6 rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-2xl"
              variants={{
                hidden: { opacity: 0, rotateY: 90, y: 50 },
                visible: {
                  opacity: 1,
                  rotateY: 0,
                  y: 0,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
              whileHover={{ rotateX: 5, rotateY: -5 }}
            >
              <div className="flex items-center justify-center bg-white text-orange-500 w-16 h-16 rounded-full shadow-lg mb-4 mx-auto">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <div className="w-16 h-1 bg-white mx-auto mb-4 rounded"></div>
              <p className="text-lg leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
