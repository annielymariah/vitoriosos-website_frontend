interface TitleProps {
  text: string;
}

export const Title = ({ text }: TitleProps) => {
  return (
    <>
      <h1 className="flex justify-center items-center font-staatliches text-[4rem] text-black text-shadow-green-gradient pb-6 leading-[0.8]">
        {text}
      </h1>
    </>
  );
};
