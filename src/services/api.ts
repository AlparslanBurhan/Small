
const API_URL = 'https://68a30efdc5a31eb7bb1eca63.mockapi.io';

import { CardData } from '@/types/interfaces';

export async function getCardData(limit: number): Promise<CardData[]> {
  const res = await fetch(`${API_URL}/blog-data?page=${limit}&limit=10`);

  if (!res.ok) {
    throw new Error('Veri alınırken bir hata oluştu');
  }

  const data = await res.json();
  return data;
}

export async function getCardDataById(id: number): Promise<CardData> {
  const res = await fetch(`${API_URL}/blog-data/${id}`);

  if (!res.ok) {
    throw new Error('Veri alınamadı');
  }

  const data = await res.json();
  return data;
}

export async function setClapById(id: number, claps: number): Promise<void> {

  const getRes = await fetch(`${API_URL}/blog-data/${id}`)
  if (!getRes.ok) {
    throw new Error('Veri alınamadı')
  }
  const existingData = await getRes.json()
  const updatedData = { ...existingData, clap_sayisi: claps }
  const putRes = await fetch(`${API_URL}/blog-data/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })

  if (!putRes.ok) {
    throw new Error('Clap verisi güncellenemedi')
  }
}

export async function getFavoriteId() {
  const res = await fetch(`${API_URL}/fav-blog`);

  if (!res.ok) {
    throw new Error('Veri alınırken bir hata oluştu');
  }

  const data = await res.json();
  return data;
}

export async function setFav(fav: number[]): Promise<void> {

  const putRes = await fetch(`${API_URL}/fav-blog/1`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fav: fav,
      id: "1"
    })

  })

  if (!putRes.ok) {
    throw new Error('fav verisi güncellenemedi')
  }
}