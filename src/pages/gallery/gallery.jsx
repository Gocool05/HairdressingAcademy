import React, { useState } from "react";
import "./gallery.css";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Gallery } from "react-grid-gallery";

const API_URL = process.env.REACT_APP_API_URL;


const Album = () => {

  const images = [
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/DSC_6591_c29ce19f4d.JPG",
      original: "https://api.ihfbyjavedkhan.com/uploads/DSC_6591_c29ce19f4d.JPG",
      // tags: [
      //   { value: "Nature", title: "Nature" },
      //   { value: "Flora", title: "Flora" },
      // ],
      caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/DSC_6680_20a23ece48.JPG",
      original: "https://api.ihfbyjavedkhan.com/uploads/DSC_6680_20a23ece48.JPG",
      caption: "Boats (Jeshu John - designerspics.com)",
    },
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/N7_A1053_a7dc1f9737.jpeg",
      original: "https://api.ihfbyjavedkhan.com/uploads/N7_A1053_a7dc1f9737.jpeg      ",
      
      caption: "Color Pencils (Jeshu John - designerspics.com)",
    },
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/N7_A1339_631155380e.jpeg",
      original: "https://api.ihfbyjavedkhan.com/uploads/N7_A1339_631155380e.jpeg",
      // width: 320,
      // height: 213,
      caption: "Red Apples with other Red Fruit (foodiesfeed.com)",
    },
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/N7_A1015_1b5f19e2ca.jpeg",
      original: "https://api.ihfbyjavedkhan.com/uploads/N7_A1015_1b5f19e2ca.jpeg",
      caption: "37H (gratispgraphy.com)",
    },
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220904_133014071_e0f7f5c145.jpg",
      original: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220904_133014071_e0f7f5c145.jpg",
      // width: 240,
      // height: 320,
      // tags: [{ value: "Nature", title: "Nature" }],
      // caption: "8H (gratisography.com)",
    },
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220904_140819342_ab7942824f.jpg",
      original: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220904_140819342_ab7942824f.jpg",

      caption: "286H (gratisography.com)",
    },
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220907_135827656_6b9c82ea5d.jpg",
      original: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220907_135827656_6b9c82ea5d.jpg",
      caption: "315H (gratisography.com)",
    },
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220904_143325457_f8db8fb189.jpg",
      original: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220904_143325457_f8db8fb189.jpg",
 
      caption: "201H (gratisography.com)",
    },
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220907_140215103_64e85891e5.jpg",
      original: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220907_140215103_64e85891e5.jpg",
      alt: "Big Ben - London",
      caption: "Big Ben (Tom Eversley - isorepublic.com)",
    },
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220816_215522429_498f9090fa.jpg",
      original: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220816_215522429_498f9090fa.jpg",
      // alt: "Red Zone - Paris",
      // tags: [{ value: "People", title: "People" }],
      caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)",
    },
    {
      src: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220816_185646098_d51cabc89a.jpg",
      original: "https://api.ihfbyjavedkhan.com/uploads/Polish_20220816_185646098_d51cabc89a.jpg",
      alt: "Wood Glass",
      caption: "Wood Glass (Tom Eversley - isorepublic.com)",
    },
    
  ];


  const [index, setIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (index) => {
    console.log('Opening modal with image:',);
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
      setSelectedImage(null);
      setModalOpen(false);
  };
  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
};

const prevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + images.length - 1) % images.length);
};
// console.log('modalOpen:', modalOpen);
// console.log('selectedImageIndex:', selectedImageIndex);
  return (
    <div className="container overflow-x-hidden bg-bgwhite">
            <NavBar />
            <div className="">
                <div className="section-title">
                    <h1 style={{ textAlign: "center" }} className='text-gray1'>Gallery</h1>
                    <p style={{ textAlign: "center" }} className='text-gray1'>Frozen moments from IHF by javed khan</p>
                </div>
                <div className="px-28 py-16 mq925:p-2">
                    <div id="imageGallery">
                        {images.map((image, index) => (
                            <img
                            className="h-[200px] w-auto "
                                key={index}
                                src={image.src}
                                alt={`Image ${index}`}
                                onClick={() => openModal(index)}
                                style={{ cursor: 'pointer' }}
                            />
                        ))}
                    </div>
                </div>

                {/* The modal for displaying the full-screen image */}
                {modalOpen && selectedImageIndex !== null && (
                   <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-75">
                   <div className=" rounded-lg w-auto-auto">
                     <div className="relative">
                       <button className="absolute top-0 right-0 m-4 bg-transparent font-bold text-white cursor-pointer" onClick={closeModal}>
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                         </svg>
                       </button>
                       <img className="mx-auto max-h-[500px] mq925:max-h-[400px]: max-w-full " src={images[selectedImageIndex].src} alt="Full-screen" />
                     </div>
                     <div className="flex justify-between mt-2 bg-transparent px-4">
                       <button className="bg-gray-800 text-white px-4 py-2 rounded-md btn" onClick={prevImage}>Previous</button>
                       <button className="bg-gray-800 text-white px-4 py-2 rounded-md btn" onClick={nextImage}>Next</button>
                     </div>
                   </div>
                 </div>
                )}
            </div>
            <Footer />
        </div>
  );

};

export default Album;
