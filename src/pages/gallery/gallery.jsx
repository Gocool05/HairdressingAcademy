import React, { useState } from "react";
import "./gallery.css";
import Modal from 'react-modal';
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import axios from "axios";
import { useQuery } from "react-query";

const API_URL = process.env.REACT_APP_API_URL;

const Album = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState([]);
 
  const openModal = (images) => {
    const formattedImages = images?.map(image => ({
      src: `${API_URL}${image.attributes.url}`,
      alt: image.attributes.name,
    }));
    setCurrentCategory(formattedImages);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const GalleryImages = async () => {
    const response = await axios.get(
      `${API_URL}/api/galleries?populate=*`
    );
    return response.data.data;
  };

  const { data: Pics, error, isLoading } = useQuery("Images", GalleryImages);
  console.log(Pics, 'Gallery Images');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading images</div>;
  
  return (
    <div className="container overflow-x-hidden bg-bgwhite">
      <NavBar />
        <div className="section-title">
          <h1 style={{ textAlign: "center" }} className="text-gray1">
            Gallery
          </h1>
          <p style={{ textAlign: "center" }} className="text-gray1">
            Frozen moments from IHF by javed khan
          </p>
        </div>

        <div className="category-list ">
          {Pics.map((images, index) => (
            <div key={index} className="card overflow-hidden flex relative w-full h-[300px]">
              <img
                className=" h-[230px] w-[300px] mq450:w-full m-3 object-cover"
                onClick={() => openModal(images?.attributes.Images.data)}
                src={`${API_URL}${images?.attributes.Images.data[0].attributes.url}`}
                alt={images?.attributes.Category}
              />
              <div className="info-card">
                <p>
                  <strong>{images?.attributes.Category}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Image Carousel"
          className='p-10 mq450:p-5 mq450:pt-20'
        >
          <Carousel
            images={currentCategory}
            style={{ height: 500, width: 800 }}
          />
        </Modal>
      <Footer />
    </div>
  );
};

export default Album;
