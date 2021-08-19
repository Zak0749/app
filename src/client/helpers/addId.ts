function makeid(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random()
* charactersLength));
  }
  return result;
}

function addId<T>(array: T[]): Array<T & { id: string; }> {
  const used:string[] = [];

  return array.map((data) => {
    let id = makeid(24);
    while (used.includes(id)) {
      id = makeid(24);
    }

    used.push(id);
    return { ...data, id };
  });
}

export default addId;
