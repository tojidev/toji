import PageContainer from "@/components/common/PageContainer";
import ContactDetailsContact from "@/components/contact/ContactDetails";
import LeftContentsContact from "@/components/contact/LeftContentsContact";

const Contact = () => {
  return (
    <PageContainer
      LeftContents={<LeftContentsContact />}
      RightcontentItems={<ContactDetailsContact />}
    />
  );
};

export default Contact;
