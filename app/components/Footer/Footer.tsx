import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer
      className="
    bg-slate-700
    text-slate-200
    text-sm
    mt-16
    "
    >
      <Container>
        <div
          className="
        flex
        flex-col
        md:flex-row
        justify-between
        pt-16
        pb-8
        "
        >
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">TVs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer services</h3>
            <Link href="#">Contact us</Link>
            <Link href="#">Shipping policy</Link>
            <Link href="#">Returns & exchanges</Link>
            <Link href="#">FAQ</Link>
          </FooterList>
          <div
            className="
          w-full
          md:w-1/3
          mb-6
          "
          >
            <h3 className="text-base font-bold mb-2">About us</h3>
            <p className="mb-2 md:pr-4">
              At our electronics store, we are dedicated to providing the latest
              and greatest devices and accessories to our customers. With a
              selection of phones, TVs, laptops, watches, and accessories.
            </p>
            <p>
              &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
