// HTML 요소 선택
const userImageUpload = document.getElementById("userImageUpload");
const clothImageUpload = document.getElementById("clothImageUpload");
const pickFromWebsite = document.getElementById("pickFromWebsite");
const tryOnButton = document.getElementById("tryOnButton");

// 업로드 상태 추적 변수
let userImageUploaded = false;
let clothImageUploaded = false;

// 공통: 파일 선택 후 업로드 처리
function handleFileUpload(event, callback, updatePreview) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      updatePreview(reader.result); // 이미지 미리보기 업데이트
    };
    reader.readAsDataURL(file);
    callback(true);
  } else {
    callback(false);
  }
}

// 업로드 상태에 따라 버튼 활성화 처리
function updateButtonState() {
  if (userImageUploaded && clothImageUploaded) {
    tryOnButton.disabled = false;
  } else {
    tryOnButton.disabled = true;
  }
}

// 1. userImageUpload 처리
userImageUpload.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", (event) =>
    handleFileUpload(
      event,
      (uploaded) => {
        userImageUploaded = uploaded;
        updateButtonState();
      },
      (previewSrc) => {
        userImageUpload.style.backgroundImage = `url(${previewSrc})`; // 업로드 영역에 미리보기 적용
        userImageUpload.style.backgroundSize = "contain";
        userImageUpload.style.backgroundRepeat = "no-repeat";
        userImageUpload.style.backgroundPosition = "center";
        userImageUpload.innerHTML = ""; // 업로드 문구 제거
      }
    )
  );
  input.click();
});

userImageUpload.addEventListener("dragover", (event) => {
  event.preventDefault();
});

userImageUpload.addEventListener("drop", (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      userImageUpload.style.backgroundImage = `url(${reader.result})`;
      userImageUpload.style.backgroundSize = "contain";
      userImageUpload.style.backgroundRepeat = "no-repeat";
      userImageUpload.style.backgroundPosition = "center";
      userImageUpload.innerHTML = ""; // 업로드 문구 제거
    };
    reader.readAsDataURL(file);
    userImageUploaded = true;
    updateButtonState();
  }
});

// 2. pickFromWebsite 처리
pickFromWebsite.addEventListener("click", async () => {
  try {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.src) {
        clothImageUpload.style.backgroundImage = `url(${message.src})`;
        clothImageUpload.style.backgroundSize = "contain";
        clothImageUpload.style.backgroundRepeat = "no-repeat";
        clothImageUpload.style.backgroundPosition = "center";
        clothImageUpload.innerHTML = ""; // 업로드 문구 제거
        clothImageUploaded = true;
        updateButtonState();
      }
    });
    alert("웹페이지에서 이미지를 클릭하여 선택하세요.");
  } catch (error) {
    console.error("Error picking image from website:", error);
  }
});

// 3. clothImageUpload 처리
clothImageUpload.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", (event) =>
    handleFileUpload(
      event,
      (uploaded) => {
        clothImageUploaded = uploaded;
        updateButtonState();
      },
      (previewSrc) => {
        clothImageUpload.style.backgroundImage = `url(${previewSrc})`;
        clothImageUpload.style.backgroundSize = "contain";
        clothImageUpload.style.backgroundRepeat = "no-repeat";
        clothImageUpload.style.backgroundPosition = "center";
        clothImageUpload.innerHTML = ""; // 업로드 문구 제거
      }
    )
  );
  input.click();
});

clothImageUpload.addEventListener("dragover", (event) => {
  event.preventDefault();
});

clothImageUpload.addEventListener("drop", (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      clothImageUpload.style.backgroundImage = `url(${reader.result})`;
      clothImageUpload.style.backgroundSize = "contain";
      clothImageUpload.style.backgroundRepeat = "no-repeat";
      clothImageUpload.style.backgroundPosition = "center";
      clothImageUpload.innerHTML = ""; // 업로드 문구 제거
    };
    reader.readAsDataURL(file);
    clothImageUploaded = true;
    updateButtonState();
  }
});

// 4. tryOnButton API 호출
tryOnButton.addEventListener("click", async () => {
  try {
    const response = await fetch("https://api.example.com/try-on", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userImage: "uploaded_user_image_url",
        clothImage: "uploaded_cloth_image_url",
      }),
    });

    const result = await response.json();
    console.log("Try-On Result:", result);
    alert("합성이 완료되었습니다! 결과물을 확인하세요.");
  } catch (error) {
    console.error("Error during API call:", error);
    alert("API 호출 중 문제가 발생했습니다. 다시 시도해주세요.");
  }
});
