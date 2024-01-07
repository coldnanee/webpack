import PngImage from "@/assets/image.png";
import JpgImage from "@/assets/image.jpg";
import SvgImage from "@/assets/image.svg";
import { useState } from "react";

const AboutPage = () => {
	const [count, setCount] = useState(0);

	// if (__PLATFORM__ === "desktop") {
	// 	return <h1>THISISDESKTOP</h1>;
	// } // это будет только в сборке desktop

	// if (__PLATFORM__ === "mobile") {
	// 	return <h1>THISISMOBILE</h1>;
	// } // это будет только в сборке mobile

	// этот механизм называется tree shaking

	// к примеру - если обозначен компонент/функция и нигде не используется - в итоговый бандл она не попадет

	return (
		<>
			<h1>Abous</h1>
			<button onClick={() => setCount((prev) => prev + 1)}>++</button>
			<h2>{count}</h2>
			<img width={50} height={50} src={PngImage} alt="image" />
			<img width={50} height={50} src={JpgImage} alt="image" />
			<SvgImage fill={"red"} width={100} height={100} />
			<h2>{__PLATFORM__}</h2>
		</>
	);
};

export default AboutPage;
