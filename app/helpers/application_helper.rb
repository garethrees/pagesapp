require 'creole'

module ApplicationHelper

    def from_wiki(creole)
        html = Creole.creolize(creole)
    end

end
