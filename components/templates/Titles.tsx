interface Props {
  title: string;
}
const Titles = ({ title }: Props) => {
  return (
    <p className={`text-sm font-VazirLight text-end   items-center md:text-lg`}>{title}</p>
  );
};
export default Titles;
