import { useState, useRef } from "react"
import { useSignup } from "../hooks/useSignup"
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nicImageUpload, setNicImageUpload] = useState(null);
  const [nicImageUrl, setNicImageUrl] = useState(null);
  const [faceImageUpload, setFaceImageUpload] = useState(null);
  const [faceImageUrl, setFaceImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  
  


  const {signup, error, isLoading} = useSignup();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(error => console.log(error));
  };

  const stopCamera = () => {
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      setFaceImageUpload(blob);
      setImagePreviewUrl(URL.createObjectURL(blob));
    }, 'image/jpeg', 0.95);
    stopCamera();
  };

  const uploadNicImage = (e) => {
    e.preventDefault();
    if (nicImageUpload == null) return;
    setIsUploading(true);
    const nicImageRef = ref(storage, `nic/${nicImageUpload.name}`);
    uploadBytes(nicImageRef, nicImageUpload).then(() => {
      getDownloadURL(nicImageRef).then(url => {
        setNicImageUrl(url);
        setIsUploading(false);
        alert("NIC image uploaded " + url);
      });
    });
  };

  const uploadFaceImage = (e) => {
    e.preventDefault();
    if (faceImageUpload == null) return;
    setIsUploading(true);
    const timestamp = new Date().getTime();
    const faceImageRef = ref(storage, `face/${timestamp}_${faceImageUpload.name}`);
    uploadBytes(faceImageRef, faceImageUpload).then(() => {
      getDownloadURL(faceImageRef).then(url => {
        setFaceImageUrl(url);
        setIsUploading(false);
        alert("Face image uploaded " + url);
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, nicImageUrl, faceImageUrl);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
  
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
      <label>Upload NIC:</label>
      <input type="file" onChange={(event) => {setNicImageUpload(event.target.files[0])}} />
      <button style={{backgroundColor:"orange"}} onClick={uploadNicImage}> Upload NIC </button>
      {isUploading && <div>Uploading image, please wait...</div>}
      
      
      <label>Upload Face:</label>
      <div>
        <video ref={videoRef} style={{ width: '100%' }} autoPlay={true} />
        <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480} />
      </div>
      <button type="button" style={{backgroundColor:"grey"}} onClick={startCamera}>Start Camera</button>
      <button type="button" style={{backgroundColor:"grey"}} onClick={captureImage}>Capture Image</button>
      {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ width: '100%', marginBottom: '10px' }} />}

      <button type="button" style={{backgroundColor:"orange"}} onClick={uploadFaceImage}> Upload Face </button>
      
  
      {isUploading && <div>Uploading image, please wait...</div>}
      <button disabled={isLoading || isUploading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
