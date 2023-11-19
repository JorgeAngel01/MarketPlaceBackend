export default function Page() {
  return (
    <div className="h-full w-full grid grid-cols-2 shadow-md rounded-sm text-black">
      <Column>
        <div className="text-4xl font-semibold">Nombre</div>
        <div className="text-xl text-justify">
          Exercitation ea occaecat incididunt reprehenderit consectetur eu
          excepteur excepteur magna. Aliquip enim mollit fugiat sunt minim.
          Laboris velit esse ut do mollit officia ullamco ullamco.
        </div>
        <div className="text-2xl font-semibold">Ubicacion</div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3755.7575527203517!2d-101.18839502403122!3d19.72294363134306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d0e40be8f4d3b%3A0xf001c256ae856856!2sTechnological%20Institute%20of%20Morelia!5e0!3m2!1sen!2smx!4v1700421593757!5m2!1sen!2smx"
          width="100%"
          height="50%"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </Column>
      <Column>
        <div className="text-2xl pt-2 font-semibold">Productos</div>
        <div className="h-full w-full p-6 bg-white rounded-lg"></div>
      </Column>
    </div>
  );
}

function Column({ children }) {
  return (
    <div className="h-full w-full p-6 flex flex-col space-y-6">
      {children}
    </div>
  );
}
