export type PropertiesOf<TClass = any> = Pick<
  TClass,
  {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof TClass]: TClass[K] extends Function ? never : K;
  }[keyof TClass]
>;
