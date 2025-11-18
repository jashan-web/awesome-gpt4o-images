# How to Contribute

There are two main ways you can contribute.

## Option 1: Quick Submit via GitHub Issue

If you want to quickly share an example, or if you're less familiar with the Pull Request process, submitting via an Issue is a great option.

➡️ Click here to submit a new example using the template: [Submit New Example](https://github.com/jamez-bondos/awesome-gpt4o-images/issues/new?template=add_new_example_en.yml)

---

## Method 2: Contribute via Pull Request (PR)

1. **Clone the repository and create a local branch.**

2. **Add a New Case:**
* Please refer to our [**case template directory (./case-template/)**](case-template/) to prepare your content. Each case should include two files: a YAML file and an image file.
* Create a new folder under the `cases` directory using the next available numeric ID (e.g., a folder named `83`).  
  **Note:** Just follow the latest number available; the final numbering and ordering will be handled by the maintainer during merging.
* **Prepare the image file:**
    * Image size requirements: recommended width between 300px and 2000px; preferred formats are JPEG, WebP, or PNG; please try to keep the file size under 1MB (compress if necessary).
    * *(Optional)* Filename suggestion: choose a descriptive and unique name for the image (e.g., `gold_pendant_necklace.png`). Default name is `case.png`.
* **Write the YAML case file:**
    * Fill in or modify the case details according to the template requirements.
    * Make sure to correctly reference your image filename in the YAML.
    * Be sure to correctly fill in the following fields:
        * **Author name**
        * **Author link**
        * **Source URL**
    * **Language:** You are welcome to provide detailed information in both Chinese and English. The maintainer will check for bilingual completeness during merging; if only one language is provided, the missing translation will be completed using the GPT-4o model.

3. Commit your changes and open a Pull Request on GitHub.

4. Wait for the maintainer to review and merge your PR.

---

## License Agreement

By opening a Pull Request or Issue, you **confirm that you own the
copyright or have explicit permission for every file you upload** and
**irrevocably license your contribution under CC BY 4.0**.  
Images must be either:

1. Original works you generated (e.g., via GPT-4o, Sora, gpt-image-1), or  
2. Third-party works for which you hold written permission.

Uploading unlicensed third-party images is prohibited.

---

Thank you for your contribution!
