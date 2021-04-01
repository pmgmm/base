.. index:: Shield

.. _shield:

Shield
===========

Este componente protege os conteúdos durante a execução de qualquer funcionalidade, de forma a evitar qualquer interação indesejada.

.. image:: ../resources/shield.png

Requisitos
---------- 
       
=================================== ===============
``/framework/components/shield.js``                      
``/framework/components/shared.js`` :ref:`jsshared`     
=================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.

----

Html do componente (tag)
------------------------

.. important:: As páginas geradas por :ref:`phppagehelper` carregam, por defeito, um elemento ``<fwk-shield>`` com o id="**fwk_shield**".  

.. code:: html

    <fwk-shield></fwk-shield>

===================== ================================= =========== ============================== =======
Atributo    Descrição                                   Obrigatório Opções                         Default
===================== ================================= =========== ============================== =======
``id``                Identificador único do componente Sim (?)      
``color-error``       Cor mensagens de erro             Não         "blue", "gray", "green", "red" "red"
``color-success``     Cor mensagens de sucesso          Não         "blue", "gray", "green", "red" "green"
``color-information`` Cor mensagens de informação       Não         "blue", "gray", "green", "red" "blue"
===================== ================================= =========== ============================== =======

.. important:: O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_shield = FormHelper.getComponent('fwk_shield');
    
Activar / desactivar shield
^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_shield.enable = true;
    obj_shield.enable = false;

.. important:: Ao activar o ``shield`` directamente, tal como é feito pelo componente :ref:`modal`, a transparência é colocada a 50%. 

Activar / desactivar barra de progresso
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_shield.progress = true;
    obj_shield.progress = false;

.. important:: Ao activar a barra de progresso, é imediatamente activado o ``shield`` com transparência total. 

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.