import { Navigation } from "@/components/Navigation";
import { MapboxGlobe } from "@/components/MapboxGlobe";
import { ActiveUsersCard } from "@/components/ActiveUsersCard";

const Index = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <Navigation />
      <MapboxGlobe />
      <ActiveUsersCard />
    </div>
  );
};

export default Index;
