import { api } from './api';

export async function fetchMediaList() {
  const res = await api('GET', '/media');
  return res.data.data.medias;
}

export async function createMedia(payload) {
  const res = await api('POST', '/media', payload);
  return res.data.data.media;
}

export async function updateMedia(id, payload) {
  const res = await api('PUT', `/media/${id}`, payload);

  return res.data.data.media;
}

export async function deleteMedia(id) {
  const res = await api('DELETE', `/media/${id}`);
  return res.data;
}

export async function fetchMedia(id) {
  const res = await api('GET', `/media/${id}`);
  return res.data.data.media;
}

export async function fetchMediaWords(id, pageIndex = 1, pageSize = 10) {
  const res = await api('GET', `/mediawords/${id}/words`, { pageIndex, pageSize });
  return res.data.data;
}

export async function createMediaWord(id, payload) {
  const res = await api('POST', `/mediawords/${id}/words`, payload);
  return res.data.data.word;
}

export async function updateMediaWord(id, wordId, payload) {
  const res = await api('PUT', `/mediawords/${id}/words/${wordId}`, payload);
  return res.data.data.word;
}

export async function deleteMediaWord(id, wordId) {
  const res = await api('DELETE', `/mediawords/${id}/words/${wordId}`);
  return res.data.data;
}
