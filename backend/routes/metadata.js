const sharp = require("sharp");

async function getMetadata() {
 try{
  const metadata = await sharp("./public/images/P1050002b.JPG").metadata();
  console.log(metadata.format);
  console.log(metadata.orientation);

 }catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
}

async function resizeImage() {
  try {
    await sharp("./public/images/P1050002.JPG")
      .rotate()
      .resize({
        width: 1280,
        // height: 720
      })
      .toFile("./public/images/P1050002toto.JPG");
  } catch (error) {
    console.log(error);
  }
}

async function getMetadata2() {
  try{
   const metadata = await sharp("./public/images/P1050002toto.JPG").metadata();
   console.log(metadata.format);
   console.log(metadata.orientation);
 
  }catch (error) {
     console.log(`An error occurred during processing: ${error}`);
   }
 }
getMetadata();
resizeImage();
getMetadata2();
