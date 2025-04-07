const SummaryDetails = async ({
  params,
}: {
  parms: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <div> {id} </div>;
};

export default SummaryDetails;
