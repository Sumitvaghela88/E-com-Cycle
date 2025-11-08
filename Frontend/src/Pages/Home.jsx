import { lazy, Suspense } from "react";
import LoadingScreen from "../Components/LoadingScreen";

// Lazy load each section
const HeroSection = lazy(() => import("../Components/HeroSection"));
const MainSection = lazy(() => import("../Components/MainSection"));
const Features = lazy(() => import("../Components/Feature"));
const TechnicalDetails = lazy(() => import("../Components/TechnicalDetails"));
const FinalWordSection = lazy(() => import("../Components/FinalWordSection"));
const ReviewsSection = lazy(() => import("../Components/Reviewssection"));
const ProductsSection = lazy(() => import("../Components/ProductsSection"));

const Home = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <>
        <HeroSection />
        <MainSection />
        <Features />
        <TechnicalDetails />
        <FinalWordSection />
        <ReviewsSection />
        <ProductsSection />
      </>
    </Suspense>
  );
};

export default Home;
