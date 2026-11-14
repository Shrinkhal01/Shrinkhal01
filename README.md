# Hi, I'm Shrinkhal 👋

**Regular guy** working toward a **computer vision engineer** role. I care about two things: models that **hold up on real data**, and **explanations** that survive someone checking them.

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=flat&logo=opencv&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat&logo=scikitlearn&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

---

## 🔭 What I work on

- I love **Linux and the terminal**, and machine learning, especially computer vision, is where I want to build my career.
- **Linux and terminals**: my favourite environment, and I’m working toward making it my daily setup
- **Medical imaging**: 3D deep learning on chest CT scans (LIDC-IDRI)
- **Tiny object detection**: objects under 16 px in aerial images
- **Explainable AI**: Grad-CAM and occlusion maps, scored against ground truth
- **Honest evaluation**: multi-seed runs, bootstrap confidence intervals, written reality checks

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

A dual-branch model: a **3D ResNet-18** on the CT patch plus a **tabular MLP** on 15 features, fused through a learned gate. Explanations are scored on all 151 test nodules, and there is an interactive Streamlit app.

- **The uncomfortable finding:** a Random Forest scored **AUC 0.942** with all features, but **0.666** without the radiologist ratings. Most of its score came from reading the answer key, so I reported that instead of the flattering number.
- **Image-only 3D ResNet** reaches about **0.90 AUC** against radiologist consensus labels. The hybrid did not beat it.

### 3. Tiny Object Detection: technical seminar (TPA-5)
[`literate-system`](https://github.com/Shrinkhal01/literate-system)

A literature-driven study of detecting objects smaller than 16 px in aerial images (AI-TOD benchmark, average object size 12.8 px).

- Surveyed **21 papers**, and chose **KLDet** as the base paper
- Identified three failure modes the authors admit to: blurred features, occlusion, and missing context
- Proposed a hybrid: **DN-FPN** feature denoising used only in training (zero inference cost), plus a lightweight **SCAM** context module

### 4. ForgeLens: explainable forgery detector for UPI payment screenshots
[`ForgeLens`](https://github.com/Shrinkhal01/ForgeLens)

Flags suspicious payment screenshots. **It raises suspicion and never confirms a payment.** Only the receiver's bank or UPI app can do that.

- **Currently:** the PII redaction pipeline is done (Phase 0). The forgery checks are planned.
- **Classical methods first:** copy-move, noise inconsistency, template homography. Deep learning only as a measured baseline.
- Tests run on **macOS and Ubuntu CI**, and the same code runs on a CPU laptop or a GPU.

### 5. Coursework: classical morphological processing on brain MRI
[`2026-Medical-Image-Morphological-Processing-Using-Brain-MRI`](https://github.com/Shrinkhal01/2026-Medical-Image-Morphological-Processing-Using-Brain-MRI)

Erosion, dilation, opening, closing, and boundary extraction on brain MRI, with Otsu thresholding and kernel experiments.

---

## 🧰 Smaller projects

| Repo | What it is |
|---|---|
| [`some-helpful-python-programs`](https://github.com/Shrinkhal01/some-helpful-python-programs) | 13 small CLI utilities: duplicate finder, large-file finder, disk usage monitor, photo duplicate cleaner, media organizer |
| [`2023-Real-time-Object-Detection-using-TensorFlow-and-OpenCV`](https://github.com/Shrinkhal01/2023-Real-time-Object-Detection-using-TensorFlow-and-OpenCV) | Webcam object detection with SSD MobileNet v3 and OpenCV DNN |
| [`2024-ML-Public-version`](https://github.com/Shrinkhal01/2024-ML-Public-version) | Accident vs non-accident frame classifier, about 82% accuracy |
| [`CHATBOT-LLama-2`](https://github.com/Shrinkhal01/CHATBOT-LLama-2) | Flask chatbot running Llama 2 locally through Ollama |
| [`Analysis-of-a-Fake-Movie-Malware-Installer`](https://github.com/Shrinkhal01/Analysis-of-a-Fake-Movie-Malware-Installer) | Static analysis write-up of a fake movie file that hid its payload behind a "video codec" installer |
| [`practice-python`](https://github.com/Shrinkhal01/practice-python), [`DSA-PY`](https://github.com/Shrinkhal01/DSA-PY) | Python exercises and DSA problem solutions |

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
