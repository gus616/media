import Modal from '../../components/UI/Modal'


type PhotoViewerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  photoUrl: string;
}

const PhotoViewerModal = ({ isOpen, onClose, photoUrl }: PhotoViewerModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Photo Viewer</h1>
        <img src={photoUrl} alt="Placeholder" className="mb-4" />
        <p className="text-lg">This is a photo viewer modal.</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClose}>Close</button>
      </div>
    </Modal>
  )
}

export default PhotoViewerModal