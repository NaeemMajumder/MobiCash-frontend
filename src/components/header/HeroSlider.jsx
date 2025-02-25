import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./heroSlider.css";

// Import required modules
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import HeroText from "./HeroText";

const HeroSlider = () => {
  return (
    <header className="relative w-full">
      {/* Overlay for Dark Background */}
      <HeroText />

      {/* Swiper Slider */}
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        modules={[EffectFade, Pagination, Autoplay]}
        speed={3000}
        className="w-full h-full"
      >
        <SwiperSlide>
          <img
            src="https://media.istockphoto.com/id/1240526438/vector/abstract-blue-background-geometric-texture.jpg?s=612x612&w=0&k=20&c=R8Ay53uWRHGjITr49IQLFSeL3HVKTFUJWG6eWCKczBw="
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://c8.alamy.com/comp/2GP6J8C/notebook-in-the-box-math-notebook-background-from-a-sheet-of-paper-2GP6J8C.jpg"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtsUIqwoUQsihRM8u3Zc1bm7tdLZlbyLyghg&s"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </header>
  );
};

export default HeroSlider;
