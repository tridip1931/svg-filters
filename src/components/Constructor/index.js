import React from 'react';
import PropTypes from 'prop-types';

import deepClone from '../../helpers/deepClone';

import PrimitivePanel from '../../components/PrimitivePanel';
import DragDropItem from '../../containers/DragDropItem';

import './Constructor.css';

const getResultsList = (primitives, index) => {
  return primitives.slice(0, index)
    .map(item => item.id);
};

const Contsructor = ({primitives, dragDrop, purgePrimitives}) => {
  let items = {
    main: []
  };

  return (
    <div className="Contsructor">
      &lt;filter id="#filter">
      <button
        className="Contsructor__purge-button"
        onClick={purgePrimitives}
      >Clear</button>
      <div
        className="Contsructor__container">
        {primitives.map((primitive, index) => {

          if (primitive.children && primitive.children.length > 0) {
            primitive = deepClone(primitive);
            items[primitive.id] = [];

            primitive.children = primitive.children.map((item, childIndex) => {
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="Contsructor__item"
                  ref={node => items[primitive.id].push(node)}
                >
                  <DragDropItem
                    id={item.id}
                    parentId={primitive.id}
                    listId={primitive.id}
                    index={childIndex}
                    justAdded={item.justAdded}
                    nativeEvent={item.nativeEvent}
                  >
                    <PrimitivePanel
                      index={childIndex}
                      parentId={primitive.id}
                      primitive={item}
                      resultsList={getResultsList(primitives, index)}
                    />
                  </DragDropItem>
                </div>
              );
            });
          }

          return (
            <div
              key={primitive.id}
              id={primitive.id}
              className="Contsructor__item"
              ref={node => items.main.push(node)}
            >
              <DragDropItem
                id={primitive.id}
                listId="primitives"
                index={index}
                justAdded={primitive.justAdded}
                nativeEvent={primitive.nativeEvent}
              >
                <PrimitivePanel
                  index={index}
                  primitive={primitive}
                  resultsList={getResultsList(primitives, index)}
                />
              </DragDropItem>
            </div>
          );
        })}
      </div>

      &lt;/filter>
    </div>
  );
};

export default Contsructor;

Contsructor.propTypes = {
  primitives: PropTypes.array.isRequired
};
