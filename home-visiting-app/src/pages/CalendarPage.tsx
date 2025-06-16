import React, { useEffect, useState } from 'react';
import { getVisits, Visit } from '../services/firebaseService'; // Adjusted path

// Visit interface might be imported from firebaseService if defined there centrally

const CalendarPage: React.FC = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedVisits = await getVisits();
        setVisits(fetchedVisits);
      } catch (err) {
        console.error("Failed to fetch visits:", err);
        setError("訪問情報の読み込みに失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">訪問情報を読み込み中...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">エラー: {error}</p>;
  }

  if (visits.length === 0 && !loading) {
    return <p className="text-center text-gray-500">登録されている往診先情報はありません。</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">往診先管理</h2>

      {/* Placeholder for Calendar/List view toggle - remains same */}
      <div className="mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          カレンダー表示
        </button>
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          リスト表示
        </button>
      </div>

      <div className="space-y-6">
        {visits.map((visit) => (
          <div key={visit.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{visit.facilityName}</h3>
            <p className="text-sm text-gray-600 mb-1"><strong>担当医師:</strong> {visit.doctor}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>患者数:</strong> {visit.patientCount}名</p>
            <p className="text-sm text-gray-600 mb-1"><strong>希望時間 🕒:</strong> {visit.desiredTime}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>注意事項:</strong> {visit.notes}</p>
            <p className="text-sm text-gray-600 mb-1"><strong>担当者:</strong> {visit.contactPerson} (📞 {visit.contactPhone})</p>
            <p className="text-sm text-gray-600 mb-4"><strong>かかりつけ薬局:</strong> {visit.pharmacy}</p>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-xs text-gray-500 uppercase mb-2">リンク</h4>
              <a href="#" className="text-blue-500 hover:underline text-sm mr-4">📂 患者情報一覧</a>
              <a href="#" className="text-blue-500 hover:underline text-sm mr-4">📝 過去の診療メモ</a>
              <a href="#" className="text-blue-500 hover:underline text-sm">📷 書類・写真フォルダ</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
