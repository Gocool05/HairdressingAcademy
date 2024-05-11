import React, { useState } from "react";
import "./gallery.css";
// import Modal from 'react-modal';
// import ImageGallery from 'react-image-gallery';
// import 'react-image-gallery/styles/css/image-gallery.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";


import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import axios from "axios";
import { useQuery } from "react-query";
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

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (index,item) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <div className="container overflow-x-hidden">
    <NavBar/>
    <div className="">
    <div className="section-title" >
          <h1 style={{textAlign: "center" ,color:'#C5C6C7'}} >Gallery</h1>
          <p style={{textAlign: "center",color:'#D6D6D6'}}>Frozen moments from IHF by javed khan</p>
        </div>
        <div className="px-28 py-16 mq925:p-2">
      <Gallery
        images={images}
        onClick={handleClick}
        enableImageSelection={false}
      />
      {!!currentImage && (
        /* @ts-ignore */
        <Lightbox
          mainSrc={currentImage.original}
          imageTitle={currentImage.caption}
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.original}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.original}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
        </div>
    </div>
    <Footer/>
    </div>
  );

};

export default Album;
