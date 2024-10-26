type Props = {
  onCancel: () => void;

}

export default function ClientCancelButton({onCancel}:Props) {
  return (
    <button
      type="button"
      className="py-2 px-4 border-2 border-rose-900 hover:bg-rose-900 hover:text-white text-rose-900 font-bold text-lg rounded-lg flex-1"
      onClick={onCancel}
    >
      Cancel
    </button>
  );
}