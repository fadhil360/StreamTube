import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

function Load({ setLoad }) {
  const [total, setTotal] = useState(0);
  const [donation, setDonation] = useState(0);
  const [adsense, setAdsense] = useState(0);
  const [paid, setPaid] = useState(0);
  const [videos, setVideos] = useState([]);

  // Format angka ke dalam format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const getAllDocuments = async () => {
    try {
      let tempDonation = 0;
      let tempAdsense = 0;
      let tempPaid = 0;
      let tempTotal = 0;
      const tempVideos = [];

      const querySnapshot = await getDocs(
        collection(db, "users", setLoad, "video")
      );

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const newDonation = data.totaldonasi * (data.donasi ? 1 : 0);
        const newAdsense = data.watchcount * 0.1 * (data.adsense ? 1 : 0);
        const newPaid =
          data.boughttime * (data.price || 0) * (data.paidcontent ? 1 : 0);

        tempDonation += newDonation;
        tempAdsense += newAdsense;
        tempPaid += newPaid;
        tempTotal += newDonation + newAdsense + newPaid;

        tempVideos.push({
          title: data.name || "No Title",
          views: data.watchcount || 0,
          type: data.paidcontent
            ? "Paid Content"
            : data.adsense
            ? "Adsense"
            : "Donation",
          revenue: newDonation + newAdsense + newPaid,
        });
      });

      setDonation(tempDonation);
      setAdsense(tempAdsense);
      setPaid(tempPaid);
      setTotal(tempTotal);
      setVideos(tempVideos);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow p-6 rounded-lg mb-6 text-center">
        <h2 className="text-xl mb-4">Total Pendapatan</h2>
        <p className="text-3xl font-bold">{formatRupiah(total)}</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button className="px-4 py-2 border rounded-full">All</button>
        <button className="px-4 py-2 border rounded-full">1 Thn</button>
        <button className="px-4 py-2 border rounded-full">1 Bln</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow p-6 rounded-lg text-center">
          <h3 className="text-lg mb-2">Donation</h3>
          <p className="text-2xl font-semibold">{formatRupiah(donation)}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg text-center">
          <h3 className="text-lg mb-2">Paid Content</h3>
          <p className="text-2xl font-semibold">{formatRupiah(paid)}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg text-center">
          <h3 className="text-lg mb-2">Adsense</h3>
          <p className="text-2xl font-semibold">{formatRupiah(adsense)}</p>
        </div>
      </div>

      <div className="bg-white shadow p-6 rounded-lg">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Video</th>
              <th className="border px-4 py-2">Views</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{video.title}</td>
                <td className="border px-4 py-2">{video.views}</td>
                <td className="border px-4 py-2">{video.type}</td>
                <td className="border px-4 py-2">{formatRupiah(video.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Load;
