import React from 'react'
function AddItem({
  isOpen,
  setIsOpen,
  value,
  setValue,
  onSubmit,
  placeholder,
  buttonText,
  containerClass,
  buttonClass
}) {
  return (
    <>
      {!isOpen && (
        <div
          className={containerClass}
          onClick={() => setIsOpen(true)}
        >
          <span className="text-white">+</span>
          <span className="text-white text-sm">{buttonText}</span>
        </div>
      )}

      {isOpen && (
        <div className="bg-[#F1F2F4] w-65 p-2 rounded-md">
          <textarea
            className="w-[95%] h-8 border-2 border-blue-400 text-sm resize-none outline-none px-2 py-1"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="flex gap-x-2 mt-2">
            <button
              className={buttonClass}
              onClick={onSubmit}
            >
              {buttonText}
            </button>

            <button
              className="text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddItem;
