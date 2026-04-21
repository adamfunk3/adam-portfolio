/**
 * IndexedDB-backed store for portfolio edit data.
 * Unlike localStorage, IndexedDB can hold large base64 image data without quota errors.
 */

const DB_NAME    = 'portfolio-edits'
const STORE_NAME = 'buildings'
const DB_VERSION = 1

let _db = null

function openDB() {
  if (_db) return Promise.resolve(_db)
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = ({ target: { result: db } }) => {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
    req.onsuccess  = ({ target: { result: db } }) => { _db = db; resolve(db) }
    req.onerror    = ({ target: { error } })      => reject(error)
    req.onblocked  = () => reject(new Error('IndexedDB blocked'))
  })
}

/** Save all editable fields for a building */
export async function saveEdit(id, data) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(STORE_NAME, 'readwrite')
    const store = tx.objectStore(STORE_NAME)
    store.put(data, id)
    tx.oncomplete = () => resolve()
    tx.onerror    = ({ target: { error } }) => reject(error)
  })
}

/** Load all saved edits (returns { [buildingId]: editData }) */
export async function loadAllEdits() {
  const db = await openDB()
  return new Promise((resolve) => {
    const result = {}
    const tx     = db.transaction(STORE_NAME, 'readonly')
    const req    = tx.objectStore(STORE_NAME).openCursor()
    req.onsuccess = ({ target: { result: cursor } }) => {
      if (cursor) { result[cursor.key] = cursor.value; cursor.continue() }
      else        resolve(result)
    }
    req.onerror = () => resolve({})
  })
}
