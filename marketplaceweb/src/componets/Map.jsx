export default function Map({ latitude, longitude }) {
  const googleMapsSrc = `https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`;

  return (
    <iframe
      src={googleMapsSrc}
      width="100%"
      height="50%"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
