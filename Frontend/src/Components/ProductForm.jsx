import React, { useState, useEffect, useCallback } from "react";

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    stock: 0,
    images: [],
    specifications: {
      frameSize: "",
      wheelSize: "",
      gears: "",
      material: "",
      weight: "",
      color: [],
    },
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [colorInput, setColorInput] = useState("");

  const resetForm = useCallback(() => {
    setFormData({
      name: "", description: "", price: "", brand: "", stock: 0, images: [],
      specifications: { frameSize: "", wheelSize: "", gears: "", material: "", weight: "", color: [] },
    });
    setPreviewImages([]);
    setColorInput("");
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        specifications: product.specifications || { frameSize: "", wheelSize: "", gears: "", material: "", weight: "", color: [] },
      });
      setPreviewImages(product.images || []);
      setColorInput(product.specifications?.color?.join(", ") || "");
    } else {
      resetForm();
    }
  }, [product, resetForm]);

  // === Handle field changes ===
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // === Handle nested specifications ===
  const handleSpecChange = (e) => {
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [e.target.name]: e.target.value,
      },
    });
  };

  // === Handle image uploads ===
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    )
      .then((base64Images) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...base64Images],
        }));
        setPreviewImages((prev) => [...prev, ...base64Images]);
      })
      .catch((err) => console.error("Image upload error:", err));
  };

  const handleRemoveImage = (index) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);

    const updatedBase64 = [...formData.images];
    updatedBase64.splice(index, 1);
    setFormData({ ...formData, images: updatedBase64 });
  };

  // === Handle color array ===
  const addColor = () => {
    if (colorInput.trim()) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          color: [...formData.specifications.color, colorInput.trim()],
        },
      });
      setColorInput("");
    }
  };

  const removeColor = (index) => {
    const updatedColors = [...formData.specifications.color];
    updatedColors.splice(index, 1);
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        color: updatedColors,
      },
    });
  };

  // === Submit ===
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {product ? "Edit Product" : "Add New Product"}
      </h2>

      {/* === Basic Info === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="border p-2 rounded w-full"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          className="border p-2 rounded w-full"
          value={formData.brand}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border p-2 rounded w-full"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          className="border p-2 rounded w-full"
          value={formData.stock}
          onChange={handleChange}
        />
      </div>

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 rounded w-full"
        value={formData.description}
        onChange={handleChange}
        required
      />

      {/* === Specifications === */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="font-medium text-lg mb-2">Specifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="frameSize"
            placeholder="Frame Size"
            className="border p-2 rounded w-full"
            value={formData.specifications.frameSize}
            onChange={handleSpecChange}
          />
          <input
            type="text"
            name="wheelSize"
            placeholder="Wheel Size"
            className="border p-2 rounded w-full"
            value={formData.specifications.wheelSize}
            onChange={handleSpecChange}
          />
          <input
            type="text"
            name="gears"
            placeholder="Gears"
            className="border p-2 rounded w-full"
            value={formData.specifications.gears}
            onChange={handleSpecChange}
          />
          <input
            type="text"
            name="material"
            placeholder="Material"
            className="border p-2 rounded w-full"
            value={formData.specifications.material}
            onChange={handleSpecChange}
          />
          <input
            type="text"
            name="weight"
            placeholder="Weight"
            className="border p-2 rounded w-full"
            value={formData.specifications.weight}
            onChange={handleSpecChange}
          />
        </div>

        {/* === Color Array === */}
        <div className="mt-3">
          <label className="font-medium text-gray-700">Colors</label>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add color (e.g. Red)"
              className="border p-2 rounded w-full"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
            />
            <button
              type="button"
              onClick={addColor}
              className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {formData.specifications.color.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.specifications.color.map((clr, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
                >
                  {clr}
                  <button
                    type="button"
                    onClick={() => removeColor(idx)}
                    className="text-red-600 font-bold"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* === Image Upload === */}
      <div className="pt-2">
        <label className="block font-medium mb-1 text-gray-700">
          Upload Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* === Preview === */}
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
          {previewImages.map((img, idx) => (
            <div
              key={idx}
              className="relative border rounded-lg overflow-hidden group"
            >
              <img
                src={img}
                alt={`Preview ${idx}`}
                className="object-cover w-full h-28"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* === Buttons === */}
      <div className="flex gap-2 pt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          {product ? "Update Product" : "Add Product"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
