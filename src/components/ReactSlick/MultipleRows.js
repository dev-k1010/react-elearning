import React, { useEffect } from "react";
import Slider from "react-slick";
import CardItem from "../Card/CardItem";

// export default function MultipleRows({ courseArr, tab }) {
 
//   const settings = {
//     infinite: true,
//     centerPadding: "0px",
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     slidesPerRow: 1,
//     autoplay: true,
//     speed: 600,
//     autoplaySpeed: 2000,
//     rows: 1,
//     cssEase: "linear",
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="container">
//       <Slider {...settings}>
//         {tab === "1"
//           ? courseArr.slice(0, 8).map((course, index) => (
//               <div className="py-7 px-2" key={course.maKhoaHoc}>
//                 <CardItem
//                   course={course}
//                   stypeCard={true}
//                   isBestSeller={true}
//                 />
//               </div>
//             ))
//           : ""}
//         {tab === "2"
//           ? courseArr
//               .slice(8, 16)
//               .map((course, index) => (
//                 <div className="py-7 px-2" key={index}>
//                   <CardItem
//                     course={course}
//                     stypeCard={true}
//                     isBestSeller={false}
//                   />
//                 </div>
//               ))
//           : ""}
//       </Slider>
//     </div>
//   );
// }
