

export const uploadProfile = async (req, res) => {
    const uploadedFiles = req.files.map(file => ({
      filename: file.originalname,
      url: file.location,
    }));
    res.json({
      message: 'Files uploaded successfully!',
      files: uploadedFiles,
    });
  }