const Card = ({title, children, className, containerClassName, Icon, TopRightContainer, iconClasses}) => {
  return (
      <div className={`bg-white rounded shadow-sm p-8 border border-gray-200 rounded-lg relative flex flex-col space-y-4 ${className}`}>
          <div className={'flex justify-between items-center'}>
              <section className={'flex items-center justify-start space-x-2'}>
                  { Icon && <Icon className={`w-5 h-5 ${iconClasses}`} /> }
                  <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
              </section>
              <section className={'flex space-x-2'}>
                  { TopRightContainer ?? null }
              </section>
          </div>
          <div className={`flex-grow ${containerClassName ?? ''}`}>
              {children}
          </div>
      </div>
  );
}

export default Card;
