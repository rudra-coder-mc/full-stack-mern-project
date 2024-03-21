import ppf from "../assets/ppf.jpg";
// import interior from "../assets/INTERIOR.JPG";
import interior from "../assets/INTERIOR.jpg";
// import sunroof from "../assets/SUNROOF.JPG";
import sunroof from "../assets/SUNROOF.jpg";

export default function About() {
  return (
    <div className="about-us bg-blue-200 h-auto flex flex-col items-center justify-center p-8">
      <h2 className="text-5xl  font-bold mb-4">Welcome to Uniq`s Automotive</h2>
      <p className="text-lg  mb-8 leading-relaxed">
        Uniq`s Automotive is your premier destination for top-quality car
        accessories and automotive services. Our passion for cars drives us to
        deliver exceptional products and services that meet all your automotive
        needs.
      </p>

      <div className="mission-section mb-8">
        <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
        <p className="text-lg leading-relaxed">
          We strive to enhance your driving experience by offering innovative
          and reliable car accessories tailored to your style and functionality
          preferences. Additionally, our aim is to provide outstanding
          automotive services that ensure optimal vehicle performance and
          longevity.
        </p>
      </div>

      <div className="what-sets-us-apart mb-8">
        <h3 className="text-3xl font-bold mb-4">What Sets Us Apart</h3>
        <ul className="text-lg leading-relaxed">
          <li>
            Curated Selection: We meticulously handpick each product in our
            inventory to guarantee quality, performance, and style.
          </li>
          <li>
            Expertise: Our team consists of experienced professionals who are
            passionate about cars and dedicated to delivering exceptional
            service.
          </li>
          <li>
            Customer Satisfaction: Your satisfaction is our priority, and we
            strive to exceed your expectations with every interaction.
          </li>
        </ul>
      </div>

      <div className="our-services mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Services</h1>
        <p className="text-lg leading-relaxed">
          Uniq`s Automotive is your one-stop solution for modifying,
          customizing, and giving your car a unique look and feel. We offer a
          wide range of services including car wrapping, custom interior design,
          soundproofing, auto lighting, car detailing, high-end audio
          installation, car restoration, paint protective film, and more. With
          our highly skilled and dedicated team of experts, we are committed to
          serving you efficiently. Our spacious workshop features ample parking
          slots and multiple bays equipped with advanced technology to
          professionally transform your car according to your desires.
        </p>
      </div>

      <div className="flex justify-center">
        <img
          src={ppf}
          className="rounded-3xl object-fill h-48 w-48 mx-4"
          alt="Paint Protective Film"
        />
        <img
          src={interior}
          className="rounded-3xl object-fill h-48 w-48 mx-4"
          alt="Custom Interior"
        />
        <img
          src={sunroof}
          className="rounded-3xl object-fill h-48 w-48 mx-4"
          alt="Sunroof Installation"
        />
      </div>
    </div>
  );
}
