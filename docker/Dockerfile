# CUDA 런타임이 포함된 기본 이미지 사용
FROM nvidia/cuda:12.0.1-runtime-ubuntu22.04

# 비대화형 모드 설정
ENV DEBIAN_FRONTEND=noninteractive

# 필수 시스템 의존성 설치
RUN apt-get update && apt-get install -y \
    ffmpeg libsm6 libxext6 \
    python3 python3-pip git wget curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade huggingface_hub
# ComfyUI 디렉터리 생성 및 리포지토리 복제
WORKDIR /workspace
RUN git clone https://github.com/comfyanonymous/ComfyUI.git || echo "Git clone failed"
# Python 의존성 설치
WORKDIR /workspace/ComfyUI
RUN git checkout tags/v0.3.7
RUN pip install -r requirements.txt


WORKDIR /workspace/ComfyUI/custom_nodes 
# ComfyUI 매니저 설치
RUN git clone https://github.com/ltdrdata/ComfyUI-Manager.git


WORKDIR /workspace/ComfyUI
# ComfyUI 기본 포트 노출
EXPOSE 8188

# ComfyUI 서버 실행 명령어
CMD ["python3", "main.py", "--listen"]
