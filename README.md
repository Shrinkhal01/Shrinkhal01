# Hi, I'm Shrinkhal 👋

**Machine learning and computer vision developer.** I care about two things: models that **hold up on real data**, and **explanations** that survive someone checking them.

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=flat&logo=opencv&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat&logo=scikitlearn&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

---

## 🔭 What I work on

- **Medical imaging**: 3D deep learning on chest CT scans (LIDC-IDRI)
- **Explainable AI**: Grad-CAM and occlusion maps, scored against ground truth
- **Honest evaluation**: multi-seed runs, bootstrap confidence intervals, written reality checks
- **Tiny object detection**: objects under 16 px in aerial images
- **Linux and the terminal**: my favourite place to work

---

## 🚀 Featured projects

### 1. Lung Nodule Detection: a hybrid, explainable 3D pipeline
[`2026-lung-nodule-detection`](https://github.com/Shrinkhal01/2026-lung-nodule-detection)

Finds nodules that **3 of 4 radiologists agreed on** in full chest CT scans. A research prototype, not a medical device.

- **Pipeline (FINDERS):** blob detector → **3D CNN ensemble** → **occlusion maps**
- **Test CPM 0.823** (95% CI 0.767–0.868) on 135 unseen scans, with the test set opened once
- **Honest weak spot:** 3–6 mm nodules are found only **63%** of the time at 1 false alarm per scan
- Ran a full scan end to end on an **8 GB MacBook CPU**, and documented the cost

### 2. Hybrid Explainable AI for Malignancy Prediction
[`Hybrid-Explainable-AI-for-Pulmonary-Nodule-Malignancy-Classification-using-CT-Patches`](https://github.com/Shrinkhal01/Hybrid-Explainable-AI-for-Pulmonary-Nodule-Malignancy-Classification-using-CT-Patches)

A dual-branch model: a **3D ResNet-18** on the CT patch plus a **tabular MLP** on 15 features. Explanations are scored on all 151 test nodules, and there is an interactive Streamlit app.

- **The uncomfortable finding:** a Random Forest scored **AUC 0.942** with all features, but **0.666** without the radiologist ratings. Most of its score came from reading the answer key, so I reported that instead of the flattering number.
- **Image-only 3D ResNet** reaches about **0.90 AUC**. The hybrid did not beat it.

### 3. Morphological processing on brain MRI
[`2026-Medical-Image-Morphological-Processing-Using-Brain-MRI`](https://github.com/Shrinkhal01/2026-Medical-Image-Morphological-Processing-Using-Brain-MRI)

Erosion, dilation, opening, closing, and boundary extraction on brain MRI, with Otsu thresholding and kernel experiments.

---

## 🗂 Earlier work

| Year | Repo | What it is |
|---|---|---|
| 2024 | [`2024-ML-Public-version`](https://github.com/Shrinkhal01/2024-ML-Public-version) | Accident vs non-accident classifier for images and video frames, about 82% accuracy |
| 2023 | [`2023-Real-time-Object-Detection-using-TensorFlow-and-OpenCV`](https://github.com/Shrinkhal01/2023-Real-time-Object-Detection-using-TensorFlow-and-OpenCV) | Webcam object detection with SSD MobileNet v3 and OpenCV DNN |

---

## 🛠 Tools and skills

- **Languages:** Python (primary), Bash, Java
- **ML and CV:** PyTorch, OpenCV, scikit-learn, NumPy, pandas, nibabel, pylidc
- **Apps and demos:** Streamlit, Gradio, Flask
- **Testing:** pytest, with CPU-only test suites
- **Dev environment:** Git and GitHub, Linux (RHCSA training), macOS terminal, SSH to GPU servers

---

## 🧭 How I work

- **Verify everything.** Key numbers come from scripts in the repo, and I check them against held-out data.
- **Explainability over hype.** A model that cannot justify its answer is not finished.
- **Reality checks.** Major projects include a document listing failures, limits, and trade-offs.
- **Classical baselines first.** Deep learning has to beat a simple method by more than random seed noise.

---

## 📫 Connect

- ✉️ **Email:** [me@shrinkhal.in](mailto:me@shrinkhal.in)
- 💼 **LinkedIn:** [linkedin.com/in/shrinkhal-02761a2b0](https://linkedin.com/in/shrinkhal-02761a2b0)
- 🌐 **Website:** [shrinkhal.in](https://shrinkhal.in)
