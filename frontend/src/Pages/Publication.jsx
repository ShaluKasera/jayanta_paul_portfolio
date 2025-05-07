import React, { useState } from "react";

// Small reusable component for each publication item
const PublicationItem = ({ year, text }) => {
  return (
    <div className="flex font-light mb-3">
      <div className="font-semibold">{year}:</div>
      <p className="text-left ms-2">{text}</p>
    </div>
  );
};

const Publication = () => {
  const publications = [
    { year: "2025", text: "Jayanta Paul, Anuska Roy, Abhijit Mitra, and Jaya Sil. Hyv-summ: Social media video summarization on custom dataset using hybrid techniques. Neurocomputing, volume 614, page 128852. Elsevier, 2025." },
    { year: "2025", text: "Jayanta Paul, Siddhartha Mallick, Abhijit Mitra, Anuska Roy, and Jaya Sil. Multi-modal twitter data analysis for identifying offensive posts using a deep cross attention based transformer framework. ACM Transactions on Knowledge Discovery from Data. ACM New York, NY, 2025." },
    { year: "2024", text: "Jayanta Paul, Abhijit Mitra, Somak Sanyal, and Jaya Sil. Socialfaceemonet: A deep architecture for social media face recognition and emotion detection using customized datasets. In International Conference on Pattern Recognition, pages 309–327. Springer, 2024." },
    { year: "2024", text: "Jayanta Paul, Ahel Das Chatterjee, Devtanu Misra, Sounak Majumder, Sayak Rana, Malay Gain, Anish De, Siddhartha Mallick, and Jaya Sil. A survey and comparative study on negative sentiment analysis in social media data. Multimedia Tools and Applications, pages 1–50. Springer, 2024." },
    { year: "2024", text: "Abhijit Mitra, Rivujit Das, Jayanta Paul, Rajdeep Majumder, Arghyadeep Saha, Nandita Sengupta, and Jaya Sil. A deep learning framework for classifying and mitigating bias in news reporting. In Proceedings of the Future Technologies Conference, pages 424–443. Springer, 2024." },
    { year: "2023", text: "Siddhartha Mallick, Jayanta Paul, and Jaya Sil. Response fusion attention u-convnext for accurate segmentation of optic disc and optic cup. Neurocomputing, volume 559, page 126798. Elsevier, 2023." },
    { year: "2023", text: "Rajat Subhra Bhowmick, Rahul Indra, Isha Ganguli, Jayanta Paul, and Jaya Sil. Breaking captcha system with minimal exertion through deep learning: Real-time risk assessment on indian government websites. Digital Threats: Research and Practice, volume 4, pages 1–24. ACM New York, NY, 2023." },
    { year: "2023", text: "Rajat Subhra Bhowmick, Isha Ganguli, Ananya Paul, Jayanta Paul, and Jaya Sil. Improving indic code-mixed to monolingual translation using mixed script augmentation, generation & transfer learning. ACM Transactions on Asian and Low-Resource Language Information Processing. ACM New York, NY, 2023." },
    { year: "2021", text: "Rajat Subhra Bhowmick, Isha Ganguli, Jayanta Paul, and Jaya Sil. A multimodal deep framework for derogatory social media post identification of a recognized person. Transactions on Asian and Low-Resource Language Information Processing, volume 21, pages 1–19. ACM New York, NY, 2021." },
    { year: "2023", text: "Siddhartha Mallick, Nitu Saha, Jayanta Paul, Isha Ganguli, Shantonu Debnath, and Jaya Sil. An efficient deep learning framework for glaucoma diagnosis using convolution mixed transformer network. In TENCON 2023-2023 IEEE Region 10 Conference (TENCON), pages 1111–1116. IEEE, 2023." },
    { year: "2022", text: "Jayanta Paul, Anuska Roy, Siddhartha Mallick, and Jaya Sil. A comparative study of deep learning-based face recognition and emotion detection techniques using social media customized cartoon post. In International Conference on Computational Intelligence in Pattern Recognition, pages 401–411. Springer, 2022." },
    { year: "2022", text: "Jayanta Paul, Rajat Subhra Bhowmick, and Jaya Sil. Low-computation iot system framework for face recognition using deep learning algorithm. In International Conference on Computational Intelligence in Pattern Recognition, pages 24–35. Springer, 2022." },
    { year: "2022", text: "Siddhartha Mallick, Jayanta Paul, Nandita Sengupta, and Jaya Sil. Study of different transformer based networks for glaucoma detection. In TENCON 2022-2022 IEEE Region 10 Conference (TENCON), pages 1–6. IEEE, 2022." },
    { year: "2021", text: "Rajat Subhra Bhowmick, Isha Ganguli, Jayanta Paul, and Jaya Sil. Effectiveness of decoder transformer network in breaking low-resource real-time text captcha system. In 2021 international conference on cyberworlds (CW), pages 287–290. IEEE, 2021." },
    { year: "2020", text: "Jayanta Paul, Rajat Subhra Bhowmick, Baisakhi Das, and Biplab K Sikdar. A smart home security system in low computing iot environment. In 2020 IEEE 17th India council international conference (INDICON), pages 1–7. IEEE, 2020." },
    { year: "2020", text: "Jayanta Paul, Rajat S Bhowmick, Riom Sen, Dwaipayan Ray, Suman S Manjhi, Soumya Sen, and Biplab K Sikdar. Evaluation of face recognition schemes for low-computation iot system design. In 2020 24th International Symposium on VLSI Design and Test (VDAT), pages 1–6. IEEE, 2020." },
  ];

  const [visibleCount, setVisibleCount] = useState(3);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 3);
  };
  const handleViewLess = () => {
    setVisibleCount(3);
  };
  

  return (
    <div>
      <p className="text-left text-2xl font-mono">Publication</p>
      <div className="bgblue w-full h-[2px] mb-2"></div>

      {publications.slice(0, visibleCount).map((pub, index) => (
        <PublicationItem key={index} year={pub.year} text={pub.text} />
      ))}

<div className="mt-2 flex justify-center gap-4 ">
  {visibleCount < publications.length && (
    <button
      onClick={handleViewMore}
      className="px-4 py-2 bgblue text-white rounded transition"
    >
      View More
    </button>
  )}

  {visibleCount > 3 && (
    <button
      onClick={handleViewLess}
      className="px-4 py-2 bgblue text-white rounded transition"
    >
      View Less
    </button>
  )}
</div>

    </div>
  );
};

export default Publication;
