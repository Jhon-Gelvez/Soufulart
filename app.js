document.addEventListener("DOMContentLoaded", () => {
    // Menu toggle functionality (original)
    const menuButton = document.querySelector(".header__menu-button");
    const menu = document.querySelector(".menu");

    if (menuButton && menu) {
        menuButton.addEventListener("click", () => {
            menu.style.display =
                menu.style.display === "block" ? "none" : "block";
        });
    }

    // Mobile menu toggle functionality (nuevo)
    const mobileMenuButton = document.querySelector(".header__button.--menu");
    const closeMenuButton = document.querySelector(".menu-lateral__close");
    const mobileMenu = document.querySelector(".menu-lateral");

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
            mobileMenu.classList.add("menu-lateral--active");
        });
    }

    if (closeMenuButton) {
        closeMenuButton.addEventListener("click", () => {
            mobileMenu.classList.remove("menu-lateral--active");
        });
    }

    // Dynamic product image from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrl = urlParams.get("image");
    const productImage = document.querySelector(".card__img");

    if (imageUrl && productImage) {
        productImage.style.backgroundImage = `url("${imageUrl}")`;
    }

    // Back button functionality
    const backButton = document.querySelector(".header__back-button");
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = "inicio.html"; // Redirect to home page
        });
    }

    // WhatsApp button functionality
    const whatsappButton = document.querySelector(".footer__button.--whatsapp");
    if (whatsappButton) {
        whatsappButton.addEventListener("click", enviarWhatsApp);
    }
});

function enviarWhatsApp() {
    const numero = "+573132504295"; // Replace with your number
    const nombreImagen = "piña"; // Replace with dynamic image name if needed
    const mensaje = `Hola, vi la imagen "${nombreImagen}" y quiero más información`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank"); // Open WhatsApp in a new tab
}

// Remove unused section references and ocultarSeccion since sections are now separate HTML files
// The following code is commented out as it seems unrelated to the current HTML structure

var gk_isXlsx = false;
var gk_xlsxFileLookup = {};
var gk_fileData = {};

function filledCell(cell) {
    return cell !== "" && cell != null;
}
function loadFileData(filename) {
    if (gk_isXlsx && gk_xlsxFileLookup[filename]) {
        try {
            var workbook = XLSX.read(gk_fileData[filename], { type: "base64" });
            var firstSheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[firstSheetName];

            // Convert sheet to JSON to filter blank rows
            var jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                blankrows: false,
                defval: "",
            });
            // Filter out blank rows (rows where all cells are empty, null, or undefined)
            var filteredData = jsonData.filter((row) => row.some(filledCell));

            // Heuristic to find the header row
            var headerRowIndex = filteredData.findIndex(
                (row, index) =>
                    row.filter(filledCell).length >=
                    filteredData[index + 1]?.filter(filledCell).length
            );
            // Fallback
            if (headerRowIndex === -1 || headerRowIndex > 25) {
                headerRowIndex = 0;
            }

            // Convert filtered JSON back to CSV
            var csv = XLSX.utils.aoa_to_sheet(
                filteredData.slice(headerRowIndex)
            );
            csv = XLSX.utils.sheet_to_csv(csv, { header: 1 });
            return csv;
        } catch (e) {
            console.error(e);
            return "";
        }
    }
    return gk_fileData[filename] || "";
}
