import mongoose from "mongoose";

export const db = async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://root:RNVr1Aao5K3QOAuN@cluster0.2yqfzdq.mongodb.net/');

        console.log('Se conecto correctamente');
        
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
