const GenerateId = string => (
    window.btoa(string + new Date().toISOString())
);

export default GenerateId;
