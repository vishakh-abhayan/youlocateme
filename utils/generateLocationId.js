export const generateLocationId = async (homeName) => {
  let unique = false;
  let locationId = "";
  while (!unique) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit random number
    locationId = `${homeName}${randomNumber}@ylocateme`; // Concatenate the home name and the random number
    const existingUser = await User.findOne({ locationId });
    if (!existingUser) {
      unique = true;
    }
  }
  return locationId;
};
