import RoomSeed from "./modules/room/room.seed";

const runSeeders = () => {
  setTimeout(() => {
    const run = new RoomSeed();
    run.seed().catch((error) => console.error("Error when running the rooms seeder. ", error));
  }, 5000); // Wait for the server to initialize
};

export default runSeeders;
