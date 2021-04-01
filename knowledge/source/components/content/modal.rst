.. index:: Modal 

.. _modal:

Modal
=====

Este componente associa componentes dentro de uma janela (modal).

.. image:: ../resources/modal.png

Requisitos
---------- 
       
=================================== ===============
``/framework/components/modal.js``   
``/framework/components/shield.js`` :ref:`shield`                    
``/framework/components/shared.js`` :ref:`jsshared`     
=================================== ===============

.. note:: As páginas geradas por :ref:`phppagehelper` fazem, por defeito, o carregamento dos componentes necessários.  

----

Html do componente (tag)
------------------------

.. code:: html

    <fwk-modal>
        <div slot="content">
            component
            component
            ...
        </div>
    </fwk-modal>

.. important:: O conteúdo admite html.

=========== ================================= =========== =============== =======
Atributo    Descrição                         Obrigatório Opções          Default
=========== ================================= =========== =============== =======
``id``      Identificador único do componente Sim (?)        
``title``   Título da janela                  Não
``color``   Cor base do componente            Não         "blue", "gray"  "gray"
=========== ================================= =========== =============== =======

.. important:: O atributo ``id`` só é obrigatório no caso de ser necessária a identificação do componente para interacção com qualquer uma das suas funcionalidades.

=========== =========== =========== ===========
Slot        Descrição   Obrigatório Observações
=========== =========== =========== ===========
``content`` Componentes Sim         Admite html
=========== =========== =========== ===========

Funcionalidades
---------------

Assumindo que exite um objecto instanciado com o componente:

.. code:: Javascript

    const obj_modal = FormHelper.getComponent('fwk_modal');
    
Mostrar / esconder
^^^^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_modal.show = true;
    obj_modal.show = false;

Atribuir título
^^^^^^^^^^^^^^^
.. code:: Javascript

    obj_modal.title = '?';

----

Referências
-----------

:ref:`jsformhelper` é uma classe de auxílio às operações sobre formulários.