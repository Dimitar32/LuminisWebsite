const API_URL = "https://luminisapi.onrender.com/api";/*"http://localhost:5000/api"; */


/**
 * Fetch products from the API.
 * @param {string} brand - Optional brand filter.
 * @returns {Promise<Object[]>} - List of products.
 */
export const fetchProducts = async (brand) => {
  try {
      const url = brand ? `${API_URL}/products?brand=${brand}` : `${API_URL}/products`;
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.products) {
          throw new Error("Invalid API response");
      }

      return data.products;
  } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
  }
};

export const saveOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/save-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to save order: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error submitting order:", error);
        throw error;
    }
};

export const fetchEcontOffices = async () => {
    try {
      const response = await fetch(`${API_URL}/get-offices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
  
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
      const data = await response.json();
  
      if (data?.success && data.offices) {
        return data.offices;
      } else {
        console.error("❌ No offices found:", data);
        return [];
      }
    } catch (error) {
      console.error("❌ Error fetching Econt offices:", error);
      alert("Грешка при зареждането на офисите на Еконт.");
      return [];
    }
  };
  
  
// Fetch product details by ID
export const getProductById = async (id) => {
  try {
      const response = await fetch(`${API_URL}/products/${id}`);
      const result = await response.json();

      if (!response.ok) {
          throw new Error(result.message || "Грешка при зареждане на продукта.");
      }
      return result.product;
  } catch (error) {
      throw error;
  }
};